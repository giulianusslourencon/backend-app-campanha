const Member = require('../database/models/member');
const aws = require('aws-sdk');
const s3 = new aws.S3();

module.exports = {
    index(req, res) {
        Member.find({}).sort({
            coord: -1,
            name: 1
        }).populate("team").exec( (err, members) => {
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
        var image = {};
        if (req.file) {
            image.key = req.file.key;
            image.url = req.file.location;
        }
        
        const newMember =  {
            name: req.body.name,
            realName: req.body.realName,
            email: req.body.email,
            password: req.body.password,
            wpp: req.body.wpp,
            team: req.body.team,
            image: image,
            course: req.body.course,
            hasCar: req.body.hasCar,
            coord: req.body.coord
        };

        Member.create(newMember, function (err, member) {
            if (err) {
                return res.status(400).json({
                    error: `Error on database: ${ err.message }`
                });
            } else {
                return res.json(member);
            }
        });
    },

    show(req, res) {
        Member.findById(req.params.id).populate("team").exec( (err, member) => {
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
        var image = member.image;

        if (member.image.key && (req.body.deleteImage || req.file)) {
            s3.deleteObject({
                Bucket: process.env.AWS_BUCKET,
                Key: member.image.key
            }).promise();
            image = {};
        }
        
        if (req.file) {
            image.key = req.file.key;
            image.url = req.file.location;
        }
        
        const newMemberInfos = {
            name: req.body.name,
            realName: req.body.realName,
            email: req.body.email,
            password: req.body.password,
            wpp: req.body.wpp,
            team: req.body.team,
            image: image,
            course: req.body.course,
            hasCar: req.body.hasCar,
            coord: req.body.coord
        };

        await member.updateOne(newMemberInfos);
        return res.json(newMemberInfos);
    },

    async destroy(req, res) {
        const member = await Member.findById(req.params.id);
        await member.remove();
        return res.status(204).send();
    }
}