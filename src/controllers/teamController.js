const Team = require('../database/models/team');

module.exports = {
    index(req, res) {
        Team.find({}, (err, teams) => {
            if (err) {
                return res.status(400).json({
                    error: `Error on database: ${ err.message }`
                });
            } else {
                return res.json(teams);
            }
        });
    },

    create(req, res) {
        const newTeam = {
            _id: req.body.id,
            name: req.body.name,
            shortName: req.body.shortName,
            description: req.body.description,
            score: req.body.score
        };

        Team.create(newTeam, function (err, team) {
            if (err) {
                return res.status(400).json({
                    error: `Error on database: ${ err.message }`
                });
            } else {
                return res.json(team);
            }
        });
    },

    update(req, res) {
        const newTeamInfos = {
            name: req.body.name,
            shortName: req.body.shortName,
            description: req.body.description,
            score: req.body.score
        };

        Team.findByIdAndUpdate(req.params.id, newTeamInfos, {
            new: true
        }, (err, team) => {
            if (err) {
                return res.status(400).json({
                    error: `Error on database: ${ err.message }`
                });
            } else {
                return res.json(team);
            }
        });
    },

    destroy(req, res) {
        Team.findByIdAndRemove(req.params.id, function (err) {
            return res.status(204).send();
        });
    }
}