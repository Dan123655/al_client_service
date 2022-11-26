import PostModel from '../models/Post.js'
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
     } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Cannot retrieve articles"
        })
    }
}



export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findOneAndUpdate(
            {
            _id:postId,
        }, {
            $inc:{viewsCount:1},
        },
            {
            returnDocument:'after'
            }, (err,doc)=> {
                if (err) {
                    console.log(err);
                  return  res.status(500).json({
                        message:"Cannot get article"
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message:"article was not found"
                    })
                }
                console.log(doc)
                res.json(doc)
        }).populate('user')
     } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Cannot retrieve articles"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findByIdAndDelete({
            _id:postId
        }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    message:"cannot delete the article"
                })
            }
                            if (!doc) {
                    return res.status(404).json({
                        message:"article was not found"
                    })
                }
            res.json({
                    success:true
                })
        })
       
     } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Cannot retrieve articles"
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });
        const post = await doc.save()
        res.json(post)
     } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Cannot create article"
        })
    }
}
export const update = async (req, res) => {
    try { 
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId,
        },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(','),
                user: req.userId,
            });
        res.json({
            success:true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Cannot create article"
        })
    }
}
export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();
        const tags = posts
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 5);
        
        res.json(tags)
     } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Cannot retrieve tags"
        })
    }
}