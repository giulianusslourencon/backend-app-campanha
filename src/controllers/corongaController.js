const Team = require('../database/models/team');
const Member = require('../database/models/member');

module.exports = {
    teams(req, res) {
        Team.deleteMany({}, function (err) {
            return res.status(204).send();
        });
    },

    members(req, res) {
        Member.deleteMany({}, function (err) {
            return res.status(204).send();
        });
    }
}