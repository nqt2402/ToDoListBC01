/* let objectAjax = {
    url: '', // do backend qui định
    medthod: '',
    data: {} // GỬI LÊN BACKEND
} */
//BEGIN
import { Task } from "../models/Task.js";
import { TaskService } from "../services/TaskService.js";

//Khai báo đối tượng service
const taskSV = new TaskService();

const getAllTask = async () => {
    //Bước 2: 


    //Dùng service để gọi backend lấy dữ liệu về
    //Cách 1:
    // const promise = taskSV.getAllTask();
    // promise.then(result => {
    //     console.log('results', result);
    // })

    //Cách 2:
    try {
        const result = await taskSV.getAllTask();

        // console.log('result', result.data);

        //Bước 3: Từ dữ liệu lấy về tách ra 2 mảng
        let taskToDo = result.data.filter(task => task.status === false);
        // console.log('task chua lam', taskToDo);
        renderTaskToDo(taskToDo);

        let taskCompleted = result.data.filter(task => task.status === true);
        // console.log('task da lam', taskCompleted);
        renderTaskToCompleted(taskCompleted);

        /* let contentToDo = '';
        for (let taskTD of taskToDo) {
            contentToDo += `
            <li class='flexTodo>
            <span>${taskTD.taskName}</span>
               <div> 
               <a class="buttons" style="cursor: pointer;"><i class="fa fa-trash"></i></a>
                <a class="buttons" style="cursor: pointer;"><i class="fa fa-check"></i></a>
                </div>
            </li>
            `;
            console.log(taskTD);
        }
        document.getElementById("todo").innerHTML = contentToDo; */

        /*  let contentToCompleted = '';
         for (let taskTC of taskCompleted) {
             contentToCompleted += `
             <li class='flexTodo'>
             <span>${taskTC.taskName}</span>
             <div><a class="buttons" style="cursor: pointer;"><i class="fa fa-trash"></i></a>
                 <a class="buttons" style="cursor: pointer;"><i class="fa fa-redo"></i></a></div>
             </li>
             `;
             console.log(taskTC);
         }
         document.getElementById("completed").innerHTML = contentToCompleted; */

    } catch (err) {
        //Lỗi trong hàm try sẽ trả về biến er của catch 

    }
};

const renderTaskToDo = (taskToDo) => {
    const contentTaskToDo = taskToDo.reduce((content, item, index) => {
        content += `
        <li class="FlexToDo">
            <span>${item.taskName}</span>
            <span class="buttons" style="cursor: pointer" onclick="delTask('${item.taskName}')"><i class="fa fa-trash"></i></span>
            <span class="buttons" style="cursor: pointer" onclick="doneTask('${item.taskName}')"><i class="fa fa-check"></i></span>
        </li>
        `;
        return content;
    }, '')
    //DOM ra UI
    document.getElementById("todo").innerHTML = contentTaskToDo;
}

const renderTaskToCompleted = (taskToCompleted) => {
    const contentTaskToCompleted = taskToCompleted.reduce((content, item, index) => {
        content += `
        <li class="FlexToDo">
            <span style="cursor: pointer">${item.taskName}</span>
            <span class="buttons" style="cursor: pointer;" onclick="delTask('${item.taskName}')"><i class="fa fa-trash"></i></span>
            <span class="buttons" style="cursor: pointer;" onclick="rejectTask('${item.taskName}')"><i class="fa fa-undo"></i></span>
        </li>
        `;
        return content;
    }, '')
    //DOM ra UI
    document.getElementById("completed").innerHTML = contentTaskToCompleted;
}
//Bước 1: Định nghĩa và gọi hàm getAllTask
getAllTask();

/* ---NGHIỆP VỤ THÊM TASK--- */
//B.1: Định nghĩa sự kiện click cho btn#addItem
document.getElementById("addItem").onclick = async (event) => {
    //event.preventDefault(); //Chặn sự kiện hiện tại của thẻ submit hay thẻ href của thẻ a
    //event.target <= đại diện cho thẻ button đang được onclick

    //Lấy thông tin người dùng nhập từ giao diện
    let taskName = document.getElementById("newTask").value;

    //Tạo ra object backend yêu cầu
    const taskModel = new Task();
    taskModel.taskName = taskName;
    //Gọi API đưa dữ liệu về server
    try {
        let result = await taskSV.addTask(taskModel);
        console.log('ket qua them task', result.data);
        //Sau khi thêm thành công gọi API getAllTask từ hàm đã viết sẵn
        getAllTask();
    } catch (err) {
        console.log(err);
    }
}

/* ---NGHIỆP VỤ XÓA DỮ LIỆU--- */
window.delTask = async (taskName) => {
    console.log(taskName);
    let cfm = confirm('Bạn có muốn xóa task ?')
    if (cfm) {
        // Gọi API mỗi lần người dùng bấm nút xóa dữ liệu
        try {
            let result = await taskSV.deleteTask(taskName)
            
            console.log(result.data);
            //Gọi lại hàm get task sau khi xóa
            getAllTask();

        } catch (err) {
            console.log(err);
        }
    }
}

/* CHỨC NĂNG DONETASK */
window.doneTask = async (taskName) => {
    console.log(taskName);
    try {
        let result = await taskSV.doneTask(taskName);

        console.log(result.data);
        getAllTask();
    } catch (err) {
        console.log(err);
    }
}


/* CHỨC NĂNG REJECTASK */
window.rejectTask = async (taskName) => {

    let cfm = confirm('Bạn có muốn undo task ?')
    if (cfm) {
        try {
            let result = await taskSV.rejectTask(taskName);

            console.log(result.data);
            getAllTask();
        } catch (err) {
            console.log(err);
        }
    }

}