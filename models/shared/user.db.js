const bcrypt = require('bcrypt');

const db = require('@models');

const Model = db.users;

exports.login = async (data)=>{

  try{

    const {phone, password} = data;

    const datum = await Model.findOne({ where: { phone } });

    if(!datum) return { status: false, data: null, message: 'User not found!' };

    const match = await bcrypt.compare(password, datum.password);

    if(!match) return { status: false, data: null, message: 'Invalid password!' };

    datum.setDataValue('password', null);
        
    return { status: true, data: datum, message: 'User logged successfully!', pagination: null }

  }
  catch (e){
    return { status: false, data: null, message: 'User login failed!', pagination: null }
  }
};


exports.create = async (data)=>{

  try{

    const datum = await Model.create(data);

    return { status: true, data: datum, message: 'User registered successfully!', pagination: null }

  }
  catch (e){
    return { status: false, data: null, message: e.message || 'User register failed!', pagination: null }
  }
};


exports.get = async (where)=>{

  try{

    const data = await Model.findOne({ where });

    return { status: true, data, message: 'User details!', pagination: null }
  }
  catch (e){

    return { status: false, data: null, message: e.message || 'Unable to find data!', pagination: null }
  }
};

exports.fetch = async (where)=>{

  try{

    const data = await Model.findAll({ where });

    return { status: true, data, message: 'Users!', pagination: null }
  }
  catch (e){

    return { status: false, data: null, message: 'Unable to find data!', pagination: null }
  }
};

exports.list = async (data)=>{

  try{

    data.where['status'] = true;
    data.where['deleted'] = false;


    const datum = await Model.findAndCountAll({
      where:  data.where,
      offset: ((parseInt(+data.page)) - 1) * parseInt(+data.rowsPerPage),
      limit: parseInt(+data.rowsPerPage),
    });

    const pagination = {
      rowsPerPage: data.rowsPerPage,
      rowsNumber: datum.count ,
      page: data.page,
      sortBy: data.sortBy,
      descending: data.descending,
    };

    return { status: true, data: datum.rows, pagination , message: 'Users list' };

  }
  catch (e){

    return { status: false, data: null, message: e.message || 'Unable to find user!' +
    '', pagination: null }
  }
};

exports.update = async(data)=>{

  try{

    const { body, where } = data;

    where['deleted'] = false;

    const datum = await Model.update(body, { where });

    return { status: true, data: datum[0], pagination: null , message: 'Updated successfully' }
  }
  catch (e){
    return { status: false, data: null, message: e.message || 'Unable to update', pagination: null }
  }

};
