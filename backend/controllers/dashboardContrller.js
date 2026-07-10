const insight = require('../models/data');

const getDashboardStats = async (req, res) => {
    const [
        totalRecords,
        countries,
        topics,
        sectors,
        regions
    ] = await Promise.all([
        insight.countDocuments(),
        insight.distinct("country"),
        insight.distinct("topic"),
        insight.distinct("sector"),
        insight.distinct("region")
    ]);
    const clean = (arr)=> arr.filter(item=>item && item.trim()!="");
    res.status(200).json({

        success:true,

        dashboard:{

            totalRecords,

            countries:clean(countries).length,

            topics:clean(topics).length,

            sectors:clean(sectors).length,

            regions:clean(regions).length

        }

    });
}

module.exports = {getDashboardStats};