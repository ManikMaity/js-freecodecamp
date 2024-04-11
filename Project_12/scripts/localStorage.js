export default class display {
    
    static getTotalBudget (){
        const totalBudget = localStorage.getItem("totalBudget") || "0";
        return totalBudget;
    }

    static setTotalBudget (num){
        localStorage.setItem("totalBudget", num);
    }

    static getAllTrans (){
        const data = localStorage.getItem("trans-data") || "[]";
        const transData = JSON.parse(data);
        return transData;
    }

    static saveTrans (trans = {}){
        const allTrans = display.getAllTrans();
        const exiting = allTrans.find(item => item.id == trans.id);
        if (exiting){

        }
        else{
            allTrans.unshift(trans);
        }

        localStorage.setItem("trans-data", JSON.stringify(allTrans));
    }
}