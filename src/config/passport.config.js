import passport from "passport";
import local from "passport-local";
import { default as token} from 'jsonwebtoken';
import jwt from 'passport-jwt';
import userModel from "../dao/models/users.js";
import { createHash, IsValidPassword } from "../util.js";
import GitHubStrategy from "passport-github2";
import userDto from "../dto/userDto.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const PRIVATE_KEY = "CoderKeyFeliz";

export const generateToken = user => token.sign({ user }, PRIVATE_KEY, { expiresIn: '1d' })

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userModel.findOne({
            email: username,
          });
          if (user) return done(null, false);

          let role = "user";
          if (email.includes("admin")) {
            role = "admin";
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            userRole: role,
          };
          user = await userModel.create(newUser);
          return done(null, user);
        } catch (error) {
          return done({
            message: "Error creating user",
          });
        }
      }
    )
  );

  passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username , password, done) => {
    try {
        const user = await userModel.findOne({ email: username });
        if (!user) return done(null, false, { message: "User not found" });
        if (!IsValidPassword(user, password)) return done(null, false);
        const { password: pass, ...userNoPass} = user._doc;
        const jwt = generateToken(userNoPass);
        return done(null, userNoPass);
    } catch (error) {
        return done({ message: "Error logging in" });
    }
}));

passport.use('current', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: PRIVATE_KEY
}, async (jwt_payload, done) => {
    try {
         const filter = new userDto(jwt_payload)
         console.log(filter)
        return done(null, filter);
    } catch (error) {
        return done(error);
    }
}
));

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.39f03397b456b58f",
        clientSecret: "122c8b6d5de2f9e255933175a4118c609198e26a",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log({ profile });
          let user = await userModel.findOne({ email: profile._json.email });
          if (user) return done(null, user);
          const newUser = {
            first_name: profile._json.name,
            last_name: "",
            email: profile._json.email,
            age: 18,
            password: "",
          };
          user = await userModel.create(newUser);
          return done(null, user);
        } catch (error) {
          return done({ message: "Error creating user" });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    try {
      const user = await userModel.findOne({ _id });
      return done(null, user);
    } catch {
      return done({ message: "Error deserializing user" });
    }
  });

};

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['coderCookieToken'];
  }
  return token;
};



export default initializePassport;

