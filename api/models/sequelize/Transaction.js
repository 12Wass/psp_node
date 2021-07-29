import sequelize from '../../lib/sequelize';
import { DataTypes, Model } from 'sequelize';
import User from './User';
import Operation from './Operation';

class Transaction extends Model {}

Transaction.init({
    basket: {
        type: DataTypes.TEXT, 
        get: function() {
            return JSON.parse(this.getDataValue('basket'));
        }, 
        set: function(val) {
            return this.setDataValue('basket', JSON.stringify(val));
        },
        allowNull: false,
    },
    customer: {
        type: DataTypes.STRING, 
        get: function() {
            return JSON.parse(this.getDataValue('customer'));
        }, 
        set: function(val) {
            return this.setDataValue('customer', JSON.stringify(val));
        },
        allowNull: false,
    },
    billingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.ENUM(["EUR", "USD", "GBP", "CAD", "AUD"]),
        allowNull: false,
    }},
    {
        sequelize,
        modelName: "Transaction",
        paranoid: true,
    }    
);

export default Transaction;