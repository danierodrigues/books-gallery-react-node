var express = require('express');
const queryString = require('query-string');
//Models
const Book = require('../models/Book.model');


exports.getBooks = async function(req, res, next) {

    if(req.query?.q == null){
        return res.status(400).json({"message": "Required parameter q"})
    }

    try{
        const findQuery = {$and: [
            { $or: [
            req.query?.q === "-term" 
            ? {} 
            : { "volumeInfo.title": {"$regex":req.query.q, "$options": "i" } },
                { "volumeInfo.authors": {"$regex":req.query.q, "$options": "i" }},
                { "volumeInfo.description": {"$regex":req.query.q, "$options": "i" }}
            ]},
            { $and: [
                req.query?.category
                ? { "volumeInfo.categories" : {"$regex":req.query.category, "$options": "i" } }
                : {}
            ]}
        ],
        };

        const sortQuery = req.query?.orderByAplpha === 'true'
        ? {"volumeInfo.title": 1}
        : {"volumeInfo.title": -1}

        const maxResults = req.query.maxResults || 10;
        const startIndex = ((req.query.page || 1) - 1) * maxResults

        const books = await Book
            .find(findQuery)
            .skip(startIndex)
            .limit(maxResults)
            .sort(sortQuery);
        
        const totalBooks = await Book
        .find(findQuery)
        .sort(sortQuery)
        .count();

        return res.json({totalItems: totalBooks, items: books, page:req.query.page || 1 });
    }catch(error){
        console.log(error);
        onerror(error);
    }
};

exports.getBookById = async function(req, res, next) {
    if(!req.params.id){
        return res.status(400).json({"message": "Required parameter id"})
    }
    const book = await Book.findById(req.params.id);
    if(book)
        return res.json(book);
    else
        return res.status(404).json({"message": "Not Found Book."});
};

exports.getCategoriesFilters = async function(req, res, next) {
    const categories = await Book
            .find()
            .distinct("volumeInfo.categories");
    
            //console.log({categories});
    return res.json({totalcategories: categories.length, categories: categories});
};

exports.createBook = async function(req, res, next) {
    try{
        const volumeInfo = req.body;
        //Validations
        if((await Book.find({ "volumeInfo.title": title })).length != 0){
            return res.status(409).json({ok: false, message: "Already exists a book with this title."});
        }


        const book = await Book.create({volumeInfo: volumeInfo});

        if(!book){
            return res.status(409).json({ok: false, message: "Not Success creating the book."});
        }
        
        console.log({book});
        return res.status(200).json({ok: true, book: book});

    }catch(error){
        console.log(error);
        onerror(error);
    }
};