import sequelize from '../../lib/sequelize';
import { DataTypes, Model } from 'sequelize';
import Transaction from './Transaction';

class Operation extends Model {}

Operation.init({
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(["WAITING", "CANCELED", "COMPLETED", "FAILED"]),
        allowNull: false,
    },
    card: {
        type: DataTypes.STRING, 
        get: function() {
            return JSON.parse(this.getDataValue('card'));
        }, 
        set: function(val) {
            return this.setDataValue('card', JSON.stringify(val || {}));
        },
    },
    type: {
        type: DataTypes.ENUM(["PAYMENT", "REFUND"])
    }},
    {
        sequelize,
        modelName: "Operation",
        paranoid: true,
    }
);

export default Operation;