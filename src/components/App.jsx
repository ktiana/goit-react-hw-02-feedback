import { Component } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';

import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  addFeedback = event => {
    const { name } = event.target;
    this.setState(prevState => ({ [name]: prevState[name] + 1 }));
  };
  countTotalFeedback = () => {
    const totalCount = this.state.good + this.state.neutral + this.state.bad;
    return totalCount;
  };
  countPositiveFeedbackPercentage = () => {
    return Math.round((this.state.good * 100) / this.countTotalFeedback()) || 0;
  };
  render() {
    const result = this.countTotalFeedback();
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.addFeedback}
          ></FeedbackOptions>
        </Section>
        <Section title="Statistics">
          {result > 0 ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            ></Statistics>
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}

//        <h1>Please leave your feedback!</h1>
// <button name="good" type="button" onClick={this.addFeedback}>
//   Good
// </button>
// <button name="neutral" type="button" onClick={this.addFeedback}>
//   Neutral
// </button>
// <button name="bad" type="button" onClick={this.addFeedback}>
//   Bad
// </button>
// <h2>Statistics</h2>
// <ul>
//   <li>
//     <span>Good:{good}</span>
//   </li>
//   <li>
//     <span>Neutral: {neutral}</span>
//   </li>
//   <li>
//     <span>Bad: {bad}</span>
//   </li>
//   <li>
//     <span>Total: {this.countTotalFeedback()}</span>
//   </li>
//   <li>
//     <span>
//       Positive feedback: {this.countPositiveFeedbackPercentage()}%
//     </span>
//   </li>
// </ul>
