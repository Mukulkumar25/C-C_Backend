const fs = require('fs');
const filePath = "./tasks.json";

//used to take input from the command line
const command = process.argv[2]
const argument = process.argv[3]

const loadTasks = () =>{
  try{
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    // console.log(`dataJSON : ${dataJSON}`)
    return JSON.parse(dataJSON);
  }
  catch(error){
    return []
  }
}

const saveTasks = (tasks) =>{
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
}

const addTask = (task) => {
  const tasks = loadTasks()
  console.log(`tasks : ${JSON.stringify(tasks)}`)
  tasks.push({task});
  saveTasks(tasks);
  console.log("Task added ", task);
}

const listTask = () =>{
  const tasks = loadTasks();
  tasks.forEach((task, index) => {
    console.log(`${index+1} - ${task.task}`)
  });
}

const removeTask = (index) =>{
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = JSON.parse(dataBuffer.toString());
    const newData = dataJSON.filter((obj, i) => 
      i !== index
    )
    fs.writeFileSync(filePath, JSON.stringify(newData));
}

if (command === 'add'){
  addTask(argument);
}
else if (command === 'list'){
  listTask();
}
else if (command === 'remove'){
  removeTask(parseInt(argument));
}
else{
  console.log("command not find !")
}
