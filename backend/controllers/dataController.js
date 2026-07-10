const insight = require("../models/data");


const getAllInsights = async (req, res) =>{
    try{
        const {
            page = 1,
            limit = 20,
            sort = "published",
            search,
            ...filters
        } = req.query;

        const query= {};

        Object.entries(filters).forEach(([key, value]) => {
            if (value && value.trim() !== "") {
                query[key] = value.trim();
            }
        });

        if (search && search.trim() !== "") {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { topic: { $regex: search, $options: "i" } },
                { sector: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } },
                { region: { $regex: search, $options: "i" } },
                { source: { $regex: search, $options: "i" } },
                { pestle: { $regex: search, $options: "i" } },
                { insight: { $regex: search, $options: "i" } }
            ];
        }

        const skip = (Number(page) - 1) * Number(limit);

        const [insights, total] = await Promise.all([
            insight.find(query)
                .sort(sort)
                .skip(skip)
                .limit(Number(limit)),

            insight.countDocuments(query)
        ]);
        res.status(200).json({
            success: true,

            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: Number(limit)
            },

            data: insights
        });
    }catch(error){
        res.status(500).json ({ success: false, message:error.message});
    }
}

module.exports = {getAllInsights};