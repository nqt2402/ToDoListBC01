import { BaseService } from "./BaseService.js";

export class TaskService extends BaseService {
    constructor() {
        /* BẮT BUỘC GỌI LẠI PHƯƠNG THỨC CONSTRUCTOR CỦA CLASS CHA */
        super();
    }

    /* DÙNG KẾ THỪA TỪ LỚP ĐỐI TƯỢNG BaseService */
    getAllTask = () => {
        // const promise = this.get('http://svcy.myclass.vn/api/ToDoList/GetAllTask');
        // return promise;
        return this.get('http://svcy.myclass.vn/api/ToDoList/GetAllTask');
    }

    //Định nghĩa hàm đưa dữ liệu lên backend
    addTask = (task) => {// <= đúng định dạng do backend quy định
        return this.post('http://svcy.myclass.vn/api/ToDoList/AddTask', task);
    }

    //Định nghĩa hàm xóa dữ liệu
    deleteTask = (taskName) => {
        return this.delete(`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`);
    }

    //Chức năng doneTask
    doneTask = (taskName) => {
        return this.put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`);
    }

    //Chức năng rejectTask
    rejectTask = (taskName) => {
        return this.put(`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`);
    }

    /*     //CÁCH CŨ
        //Định nghĩa phương thức getAllTask
        getAllTask = () => {
            const promise = axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            })
            return promise;
        }
    
        //Định nghĩa hàm đưa dữ liệu lên backend
        addTask = (task) => {// <= đúng định dạng do backend quy định
            const promise = axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: task //{taskName: 'abc'}
            })
            return promise;
        }
    
        //Định nghĩa hàm xóa dữ liệu
        deleteTask = (taskName) => {
            const promise = axios({
                url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: 'DELETE'
            });
            return promise;
        }
    
        //Chức năng doneTask
        doneTask = (taskName) => {
            const promise = axios({
                url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
                method: 'PUT'
            })
            return promise;
        }
    
        //Chức năng rejectTask
        rejectTask = (taskName) => {
            const promise = axios({
                url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
                method: 'PUT'
            })
            return promise;
        } */
}

