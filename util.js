const trimSpace = function (array){  
    for(var i = 0 ;i<array.length;i++)  
    {  
        if(array[i] == " " || array[i] == null || array[i] == "" || typeof(array[i]) == "undefined")  
        {  
                 array.splice(i,1);  
                 i= i-1;  

        }  
    }  
    return array;  
}  

module.exports = {
    trimSpace: trimSpace
}