import sequelize from '../../lib/sequelize';
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import Transaction from './Transaction';

// Generation du model
class User extends Model {}
User.init(
  {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email.",
          },
        },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessSiret: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    businessName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cancelUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currency: {
        type: DataTypes.ENUM(["EUR", "USD", "GBP", "CAD", "AUD"]),
        allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clientToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    paranoid: true,
  }
);

User.addHook("beforeCreate", async user => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
});

export default User;