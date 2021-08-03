
exports.slotCount = (course)=> {
    return  'CAST((SELECT COUNT(`slots`.`id`) FROM `slots`' +
        ' WHERE `slots`.`course` = '+course+' AND ' +
        ' `slots`.`status` = true AND ' +
        ' `slots`.`deleted` = false) AS INT)';
};