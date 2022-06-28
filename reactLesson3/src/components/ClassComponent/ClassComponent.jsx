import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      count: 0
    };
    this.myRefGuess = React.createRef();
    this.myRefPlayAgain = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }
      console.log(`${state.userNumber}  ${state.randomNumber}`);
      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загадонного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загадонного`,
        };
      }

      const playingAgain = this.myRefPlayAgain.current;
      playingAgain.style.display = 'block';

      const guess = this.myRefGuess.current;
      guess.style.display = 'none';

      return {
        result: `Вы угадали, загадонное число ${state.userNumber},
        попыток ${state.count}`,
      };
    });

    this.setState({
      userNumber: '',
    });
  };

  handleChange = e => {
    this.setState((state, props) => ({
      userNumber: e.target.value,
    }));
  };

  playAgain = () => {
    const playingAgain = this.myRefPlayAgain.current;
    playingAgain.style.display = 'none';

    const guess = this.myRefGuess.current;
    guess.style.display = 'block';

    this.setState({
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      count: -1
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber} />
          <button className={style.btn} id='guess' ref={this.myRefGuess}>
            Угадать
          </button>
          <button className={`${style.btn} ${style.hiddenBtn}`}
            ref={this.myRefPlayAgain} onClick={this.playAgain}>Сыграть еще
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
