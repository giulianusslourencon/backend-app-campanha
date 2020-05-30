const Member = require('../database/models/member');

const imageController = require('./imageController');

module.exports = {
    index(req, res) {
        Member.find({}).sort({
            coord: -1,
            name: 1
        }).populate("team image").exec( (err, members) => {
            if (err) {
                return res.status(204).json({
                    error: `Error on database: ${ err.message }`
                });
            } else {
                return res.json(members);
            }
        });
    },

    create(req, res) {
        imageController.create(req.file, imageId => {
            const newMember =  {
                name: req.body.name,
                realName: req.body.realName,
                email: req.body.email,
                wpp: req.body.wpp,
                team: req.body.team,
                image: imageId,
                course: req.body.course,
                hasCar: req.body.hasCar,
                coord: req.body.coord
            };
    
            Member.register(newMember, req.body.password, function (err, member) {
                if (err) {
                    return res.status(400).json({
                        error: `Error on database: ${ err.message }`
                    });
                } else {
                    return res.json(member);
                }
            });
        });
        
    },

    show(req, res) {
        Member.findById(req.params.id).populate("team image").exec( (err, member) => {
            if (err) {
                return res.status(400).json({
                    error: `Error on database: ${ err.message }`
                });
            } else {
                return res.json(member);
            }
        });
    },

    async update(req, res) {
        const member = await Member.findById(req.params.id);
        imageController.update(member.image, req.file, req.body.deleteImage, async imageId => {
            const newMemberInfos = {
                name: req.body.name,
                realName: req.body.realName,
                email: req.body.email,
                wpp: req.body.wpp,
                team: req.body.team,
                image: imageId,
                course: req.body.course,
                hasCar: req.body.hasCar,
                coord: req.body.coord
            };
    
            await member.updateOne(newMemberInfos);
            return res.json(newMemberInfos);
        })
    },

    async destroy(req, res) {
        const member = await Member.findById(req.params.id);
        imageController.destroy(member.image);
        await member.remove();
        return res.status(204).send();
    }
}