const query = require('./queries');

const checkDataInLevelsTable = async ()=>{
    const result = await query.getLevels();
    return result.rows.length > 0;
};

const AddDataToLevelsTable = async () => {
    const dataExist = await checkDataInLevelsTable();
  if (!dataExist) {
    query.addLevel('beginner', 1);
    query.addLevel('mid', 5);
    query.addLevel('intermediate', 8);
    dataAdded = true;
    console.log('Data added to levels table.');
  } else {
    console.log('Data in levels table has already been added.');
  }
};

module.exports = {
  AddDataToLevelsTable
};