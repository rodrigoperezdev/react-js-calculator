import { useEffect, useReducer, useRef, useState } from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

export const Calculator = () => {
  const [operationMode, setOperationMode] = useState(null);
  const [aux, setAux] = useState(0);
  const [firstNumber, setFirstNumber] = useState(true);
  const [fontSize, setFontSize] = useState(40);

  const calculatorReducer = (state, action) => {
    switch (action.type) {
      case "ADD_FIRST_NUMBER":
        return action.payload;
      case "ADD_NUMBER":
        return state + action.payload;
      case "CLEAR_ALL":
        return 0;
      case "ADDITION":
        return parseFloat(state) + parseFloat(aux);
      case "SUBTRACTION":
        return parseFloat(state) - parseFloat(aux);
      case "MULTIPLICATION":
        return parseFloat(state) * parseFloat(aux);
      case "DIVISION":
        return parseFloat(aux) / parseFloat(state);
      case "PLUSMINUS":
        return -parseFloat(state);
      case "PERCENTAGE":
        return (parseFloat(state) / 100) * parseFloat(aux);
      case "DELETE":
        if (state.length > 1) {
          return state.slice(0, -1);
        }
        if (state.length == 1 && state != 0) {
          setFirstNumber(true);
          return 0;
        }
      default:
        return state;
    }
  };

  const [result, dispatch] = useReducer(calculatorReducer, 0);

  const onNewNumber = (num) => {
    if (result > 9999999999999) {
      setFontSize(20);
    } else if (result > 999999999) {
      setFontSize(30);
    } else {
      setFontSize(40);
    }

    if (result[result.length - 1] == "." && num == ".") {
      return;
    }

    if (result == "0" && num == "0") {
      return;
    }

    if (firstNumber && num != ".") {
      dispatch({ type: "ADD_FIRST_NUMBER", payload: num });
      setFirstNumber(false);
    } else {
      dispatch({ type: "ADD_NUMBER", payload: num });
    }
  };

  const onClearAll = () => {
    setAux(0);
    setOperationMode(null);
    setFirstNumber(true);
    setFontSize(40);
    dispatch({ type: "CLEAR_ALL" });
  };

  const onNewOperation = (type) => {
    setOperationMode(type);
    setFirstNumber(true);
    setAux(result);
  };

  const onPlusMinus = () => {
    dispatch({ type: "PLUSMINUS" });
  };

  const onNewResult = () => {
    dispatch({ type: operationMode });
  };

  //HANDLE USER KEYBOARD KEYDOWN
  const btnRef0 = useRef(null);
  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);
  const btnRef3 = useRef(null);
  const btnRef4 = useRef(null);
  const btnRef5 = useRef(null);
  const btnRef6 = useRef(null);
  const btnRef7 = useRef(null);
  const btnRef8 = useRef(null);
  const btnRef9 = useRef(null);
  const btnRefPlus = useRef(null);
  const btnRefMinus = useRef(null);
  const btnRefMultiply = useRef(null);
  const btnRefDivide = useRef(null);
  const btnRefEnter = useRef(null);
  const btnRefEscape = useRef(null);
  const btnRefPercentage = useRef(null);
  const btnRefPoint = useRef(null);

  const onKeyDown = (e) => {
    const key = e.key;

    if (/^[0-9]$/.test(key) || /^[+,-,*,/,.]$/) {
      switch (key) {
        case "0":
          btnRef0.current.click();
          break;
        case "1":
          btnRef1.current.click();
          break;
        case "2":
          btnRef2.current.click();
          break;
        case "3":
          btnRef3.current.click();
          break;
        case "4":
          btnRef4.current.click();
          break;
        case "5":
          btnRef5.current.click();
          break;
        case "6":
          btnRef6.current.click();
          break;
        case "7":
          btnRef7.current.click();
          break;
        case "8":
          btnRef8.current.click();
          break;
        case "9":
          btnRef9.current.click();
          break;
        case "+":
          btnRefPlus.current.click();
          break;
        case "-":
          btnRefMinus.current.click();
          break;
        case "*":
          btnRefPlus.current.click();
          break;
        case "/":
          btnRefDivide.current.click();
          break;
        case "Enter":
          btnRefEnter.current.click();
          break;
        case "Escape":
          btnRefEscape.current.click();
          break;
        case "Backspace":
          dispatch({ type: "DELETE" });
          break;
        case "%":
          btnRefPercentage.current.click();
          break;
        case ".":
          btnRefPoint.current.click();
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.addEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="calculator">
      <div className="calculator__result" style={{ fontSize: `${fontSize}px` }}>
        {result}
      </div>
      <div>
        <div className="calculator__row calculator__row-4">
          <Tooltip
            title="Clear (press Esc)"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={() => onClearAll()}>
              <span ref={btnRefEscape}>C</span>
            </div>
          </Tooltip>
          <Tooltip>
            <div onClick={() => onPlusMinus()}>
              <span>±</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Percentage (press %)"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={() => onNewOperation("PERCENTAGE")}>
              <span ref={btnRefPercentage}>%</span>
            </div>
          </Tooltip>
          <Tooltip
            theme="calculator"
            size="small"
            title="Division (press /)"
            delay={[200, 100]}
          >
            <div onClick={() => onNewOperation("DIVISION")}>
              <span ref={btnRefDivide} theme="calculator" size="small">
                ÷
              </span>
            </div>
          </Tooltip>
        </div>
        <div className="calculator__row calculator__row-4">
          <Tooltip
            title="Press 7"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRef7}>7</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Press 8"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRef8}>8</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Press 9"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRef9}>9</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Multiply (press *)"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={() => onNewOperation("MULTIPLICATION")}>
              <span ref={btnRefMultiply}>×</span>
            </div>
          </Tooltip>
        </div>
        <div className="calculator__row calculator__row-4">
          <Tooltip
            title="Press 4"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRef4}>4</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Press 5"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRef5}>5</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Press 6"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRef6}>6</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Minus (press -)"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={() => onNewOperation("SUBTRACTION")}>
              <span ref={btnRefMinus}>-</span>
            </div>
          </Tooltip>
        </div>
        <div className="calculator__row calculator__row-4">
          <Tooltip
            title="Press 1"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRef1}>1</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Press 2"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRef2}>2</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Press 3"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRef3}>3</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Plus (press +)"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={() => onNewOperation("ADDITION")}>
              <span ref={btnRefPlus}>+</span>
            </div>
          </Tooltip>
        </div>
        <div className="calculator__row calculator__row-3">
          <Tooltip
            title="Press 0"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRef0}>0</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Point (press .)"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={(e) => onNewNumber(e.target.innerText)}>
              <span ref={btnRefPoint}>.</span>
            </div>
          </Tooltip>
          <Tooltip
            title="Calculate result (press =)"
            delay={[2000, 100]}
            theme="calculator"
            size="small"
          >
            <div onClick={() => onNewResult()}>
              <span ref={btnRefEnter}>=</span>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
