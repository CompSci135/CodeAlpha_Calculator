var display = document.getElementById("display").value;

function appendToDisplay(input){
    display+=input;
    document.getElementById("display").value = display;
}

function clearDisplay(){
    display = "";
    document.getElementById("display").value = display;
}


function deleteLastElement(){
    
    if (document.getElementById("display").value === "") { 
        return;
    } else {
        document.getElementById("display").value = display.slice(0, -1);
        display = document.getElementById("display").value;
    }
}

function calculate(){
    if (validateParanthesis(display)!=true){
        display = "Check Paranthesis";
        document.getElementById("display").value = display;
    }
    else{
        try {
            // Replace mathematical functions with JavaScript equivalents
            let errorFlag = false;
            let result = document.getElementById("display").value
            .replace(/x/g, '*')
            .replace(/e\^\(/g, 'Math.exp(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/(\d+)P(\d+)/g, (_, n, r) => {
                const res = nPr(Number(n), Number(r));
                if (res === false){
                    document.getElementById("display").value ="Check your permutation";
                    errorFlag = true;
                } 
                return res;})
            .replace(/(\d+)C(\d+)/g, (_, n, r) => {
                const res = nCr(Number(n), Number(r));
                if (res === false){
                    document.getElementById("display").value ="Check your permutation";
                    errorFlag = true;
                } 
                return res;
            })
            .replace(/(\d+)!/g, (_, n) => {
                const res = factorial(Number(n));
                if (res === false){
                    document.getElementById("display").value ="Check your permutation";
                    errorFlag = true;
                }
                return res;
            });

            if(errorFlag == true){
                throw new Error("Invalid Input")
            }
            // Evaluate the result
            result = eval(result);
    
            // Update the displayValue and the input field
            display = result;
            document.getElementById("display").value = display;
        } 
        catch (error) {
            // Handle any errors
            document.getElementById("display").value = "Error";
            display = "";
        }
    }


    
}

function validateParanthesis(expression){
    let stackP = [];
    for (let i = 0; i< expression.length; i++){
        if (expression[i] == '('){
            stackP.push(expression[i]);
        }
        else if(expression[i] == ')'){
            if (stackP.length === 0 || stackP.pop() !== '(') {
                return 'Parenthesis is invalid!';
            }
        }
    }
    if (stackP.length != 0){
        return 'Paranthesis is invalid!';
    }
    return true;
}


function factorial(n){
    if (n<0){
        return false;
    }
    if (n==0 || n==1){
        return 1
    };
    return n*factorial(n-1);
}

function nPr(n,r){
    if (n<0 || n-r<0 || r<0){
        return false;
    }
    return (factorial(n)/ factorial(n-r));
}

function nCr(n,r){
    if (n<0 || n-r<0 || r<0){
        return false;
    }
    let x = factorial(r) * factorial(n-r);
    return factorial(n)/ x;
}