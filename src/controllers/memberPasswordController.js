const Member = require('../database/models/member');

module.exports = {
    resetPassword(req, res) {
        Member.findById(req.params.id, (err, member) => {
            if (err) return res.json(err);
            member.setPassword(req.body.password, err => {
                if (err) return res.json(err);
                member.save();
                return res.json({ message: 'Senha alterada com sucesso' });
            });
        });
    },

    changePassword(req, res) {
        Member.findById(req.params.id, (err, member) => {
            if (err) return res.json(err);
            member.changePassword(req.body.currentPassword, req.body.newPassword,
                (err, updatedMember) => {
                    if (err) return res.json(err);
                    updatedMember.save();
                    return res.json({ message: 'Senha alterada com sucesso' });
                }
            );
        });
    }
}