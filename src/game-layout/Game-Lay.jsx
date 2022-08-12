import React from 'react';
import './Game-Lay.css';
import { moveLeft, moveRight, quickSort, mergeSort } from '../game-funcs/Left-Right-Buttons.js';

export default class SVG extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mainArray: [],
      counter: 0,
      goal: 0,
    };
  }
  componentDidMount() {
    this.resetStates();
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }



  resetStates() {
    const myArray = [];
    const numArrElems = 8;
    for (let i = 1; i <= numArrElems; i++) {
      myArray.push(i * 50);
    }

    const maxGoal = (numArrElems * (numArrElems - 1)) / 2;
    let myGoal = Math.floor(Math.random() * (maxGoal - 1) + 1)
    this.setState({ mainArray: myArray, counter: 0, goal: myGoal });

  }

  newGoal() {
    let myGoal = 0;
    const { mainArray: myArray, goal: currentGoal } = this.state;
    const maxGoal = (myArray.length * (myArray.length - 1)) / 2;
    do {
      myGoal = Math.floor(Math.random() * (maxGoal - 1) + 1)
    } while (myGoal == currentGoal)


    this.setState({ counter: 0, goal: myGoal });
    document.getElementById("goal").style.color = "rgb(0, 0, 0)";
    document.getElementById("counter").style.color = "rgb(0, 0, 0)";
  }

  moveLeftArray(index, array) {
    this.setState({ mainArray: moveLeft(index, array) });
  }

  moveRightArray(index, array) {
    this.setState({ mainArray: moveRight(index, array) });
  }

  async bubbleSort(array) {
    document.getElementById("goal").style.color = "rgb(0, 0, 0)";
    document.getElementById("counter").style.color = "rgb(0, 0, 0)"; //reset to black

    let myBool = true; //will turn false if there were no sorts
    var myCount = 0;
    this.setState({ counter: myCount })
    const { goal: myGoal } = this.state;
    while (myBool) {
      myBool = false;
      for (let i = 0; i <= (array.length - 2); i++) { // -2 because length is 1 based and we will check the first and then the element after, so arr.length is 2 longer than needed
        if (array[i] > array[i + 1]) {
          ++myCount;
          await this.sleep(800);
          swap(array, i, i + 1);
          this.setState({ mainArray: array, counter: myCount });
          myBool = true;

          //update colors
          if (myCount == myGoal) {
            document.getElementById("goal").style.color = "rgb(0, 228, 0)";
            document.getElementById("counter").style.color = "rgb(0, 228, 0)";
          }
          else if (myCount > myGoal) {
            document.getElementById("goal").style.color = "rgb(199, 0, 0)";
            document.getElementById("counter").style.color = "rgb(199, 0, 0)";
          }
        }
      }
    }
    if (myCount != myGoal) {
      document.getElementById("goal").style.color = "rgb(199, 0, 0)";
      document.getElementById("counter").style.color = "rgb(199, 0, 0)";
    }


  }

  quickSort(array, left, right) {
    quickSort(array, left, right, this.partition) //imported function
    this.setState({ mainArray: array });

  }

  mergeSort(array, left, right) {
    mergeSort(array, left, right);
    this.setState({ mainArray: array });


  }

  render() {

    const { mainArray: myArray, counter: currentCount, goal: myGoal } = this.state;
    return (
      <>
        <div className="main-page">


          <div className="left">
            <div className="paragraph"> {'>'} <span className="bold">Goal:</span> match the counter with the goal number.</div>
            <div className="paragraph"> {'>'} <span className="bold">Rules/Gameplay:</span> Arrange the bars using the arrows at the bottom
            of each bar to an order you believe will make the counter equal the goal
            number of steps when you run the Bubble Sort algorithm. Each "step" is
            counted when two bars swap places.
            </div>
            <div className="paragraph"> {'>'} <span className="bold">Redo:</span> if you are unsatisfied with the order of your bars, reset
            the graph using the "Quick Sort" or "Merge Sort" buttons which will
            sort your graph seemily instantly. If you would like a new goal, press
            the "New Goal" button and a new goal will be randomly generated.
            </div>
          </div>


          <div className="middle">
            <div className="goal-count-holder">
              <div id="goal" className="title-2 goal"> Goal: {myGoal} </div>
              <div id="counter" className="title-2 counter"> Counter: {currentCount} </div>

            </div>
            <div className="array-holder">
              <div className="sorting-button-holder">
                <button onClick={(() => this.bubbleSort(myArray))} className="bubble-button">Start Bubble Sort</button>
              </div>
              {myArray.map((value, idx) => (
                <div key={idx}
                  className="array-elements"
                  style={{ height: `${value}px` }}>
                  {value / 50}
                </div>
              ))}
            </div>

            <div className="move-button-flex">
              {myArray.map((value, idx) => (
                <div key={idx}
                  className="array-elements"
                  style={{ height: `30px` }}>
                  <button onClick={(() => this.moveLeftArray(idx, myArray))} className="move-left"> {'<'} </button>
                  <button onClick={(() => this.moveRightArray(idx, myArray))} className="move-right"> {'>'} </button>
                </div>
              ))}
            </div>

          </div>



          <div className="right">
            <div className="reset-graph-holder">
              <div className="s-text"> Reset graph: </div>
              <button onClick={(() => this.quickSort(myArray, 0, myArray.length - 1))} className="side-button buttons">Quick Sort</button>
              <button onClick={(() => this.mergeSort(myArray, 0, myArray.length - 1))} className="side-button buttons" style={{ 'margin-top': `5px` }}>Merge Sort</button>
              <div className="s-text" style={{ 'margin-top': `5px` }}> Get New Goal: </div>
              <button className="side-button buttons" onClick={(() => this.newGoal())}>New Goal</button>
            </div>
          </div>

        </div>

      </>
    );

  }


}

function swap(arr, firstIndex, secIndex) {
  let tempEl = arr[firstIndex];
  arr[firstIndex] = arr[secIndex];
  arr[secIndex] = tempEl;
}
