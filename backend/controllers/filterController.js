const insight = require('../models/data');

const getFilters = async(req,res) => {
    const [
    countries,
    sectors,
    topics,
    regions,
    pestles,
    sources,
    cities,
    swots,
    endYears,
    startYears
    ] = await Promise.all([
        insight.distinct("country"),
        insight.distinct("sector"),
        insight.distinct("topic"),
        insight.distinct("region"),
        insight.distinct("pestle"),
        insight.distinct("source"),
        insight.distinct("city"),
        insight.distinct("swot"),
        insight.distinct("end_year"),
        insight.distinct("start_year")
    ]);
    const clean = (arr) =>arr
        .filter(item => item && item.trim() !== "")
        .sort();

    res.status(200).json({
        success: true,

        filters: {
            countries: clean(countries),
            sectors: clean(sectors),
            topics: clean(topics),
            regions: clean(regions),
            pestles: clean(pestles),
            sources: clean(sources),
            cities: clean(cities),
            swots: clean(swots),
            endYears: clean(endYears),
            startYears: clean(startYears)
        }
    });
}


module.exports = {getFilters};