
exports.slotCount = (course)=> {
    return  'CAST((SELECT COUNT("slots"."id") FROM "slots"' +
        ` WHERE "slots"."course" = ${course} AND ` +
        ' "reportedUsers"."status" = true AND ' +
        ' "reportedUsers"."deleted" = false) AS INT)';
};