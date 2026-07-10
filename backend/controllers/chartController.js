const { aggregateByField } = require("../utils/aggregation");

const ALLOWED_FIELDS = [
    "country",
    "region",
    "sector",
    "topic",
    "source",
    "pestle",
    "city",
    "end_year"
];

const getChart = async (req, res) => {

    try {

        const { field } = req.params;

        if (!ALLOWED_FIELDS.includes(field)) {

            return res.status(400).json({

                success: false,

                message: "Invalid chart field."

            });

        }

        const data = await aggregateByField(field, req.query);

        res.status(200).json({

            success: true,

            chart: field,

            total: data.length,

            data

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getChart

};