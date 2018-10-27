// Player_Student.js 
// Computer Science 3200 - Assignment 3
// Author(s): David Churchill [replace with your name(s)]
//

Player_Student = function (config) {
    var self = {};
    self.config = config;
    self.searchStartTime = 0;
    self.maxD = 5;

    self.bestAction = -1;
    // Student TODO:
    // You WILL need extra member variables here in order to implement IDAB properly
    // For example, you will need to store:
    //     - The maximum depth of the current iteration of IDAB search
    //     - The best action found so far for the current iteration of IDAB search 
    //     - The best action found so far for the previous COMPLETED depth of IDAB search

    // Function which is called by the GUI to get the action
    self.getAction = function (state) {

        return self.IDAlphaBeta(state);
    }

    // Student TODO: Implement this function
    //
    // This funtion should compute a heuristic evaluation of a given state for a given player.
    // It should return a large positive value for a 'good' state for the player, and a large
    // negative value for a 'bad' state for the player. Assign the maximum possible values to
    // winning and losing states, and be sure to assign values in between for states of a game
    // in progress. 
    //
    // This is one of the most important factors in your program performing well in the
    // class competition - poor heursitic functions cannot always be saved by good search.
    //
    // Args:
    //    state        : the state to evaluate
    //    player       : the player to evaluate the state for
    //
    // Returns:
    //    value (int)  : the heuristic evaluation of the state
    //
    self.eval = function (state, player) {

        var winner = state.winner();
        if (winner == player) {
            return 10000;
        } else if (winner == PLAYER_NONE) {

            var acc = 0;
            for (let x = 0; x < state.width; x++) {
                for (let y = 0; y < state.height; y++) {
                    acc += state.get(x, y) == 2 ? 0 :
                        self.computeScore(x, y) * state.get(x, y) == player ? 1 : -1;
                }
            }

            return acc;
        } else if (winner == PLAYER_DRAW) {
            return 0;
        } else {
            return -10000;
        }
    }

    self.computeScore = function (x, y) {

        w = 7
        h = 6

        truncate = function (x) {
            return x > 3 ? 3 : x;
        }

        n_groups_of_4 = function (x) {
            return x < 4 ? 0 : x - 3;
        }

        left_ = truncate(x);
        right_ = truncate(Math.abs(w - x) - 1);
        top_ = truncate(Math.abs(h - y) - 1);
        bttm_ = truncate(y);


        nw = n_groups_of_4(Math.min(left_, top_) + Math.min(right_, bttm_) + 1);
        ne = n_groups_of_4(Math.min(right_, top_) + Math.min(left_, bttm_) + 1);
        hrzntl = n_groups_of_4(right_ + left_ + 1);
        vrtcl = n_groups_of_4(top_ + bttm_ + 1);

        return nw + ne + hrzntl + vrtcl;

    }
    self.IDAlphaBeta = function (state) {

        var maxAction = -1;
        depth = self.maxD;
        var bestAction = self.AlphaBeta(state, -1000000, 1000000, depth, true)[1];


        // here is the syntax to record the time in javascript
        self.searchStartTime = performance.now();

        // return the best action found

        return bestAction;
    }

    self.AlphaBeta = function (state, alpha, beta, d, max) {
        if (d == 0) {

            return [(max ? -1 : 1) * self.eval(state, state.player == 1 ? 0 : 1), null];
        }

        // code for AlphaBeta goes here
        var actions = state.getLegalActions();
        var bestAction = null;
        if (actions.length == 1) {
            bestAction = actions[0];
        }

        if (max) {
            let value = -10000;
            for (let a = 0; a < actions.length; a++) {





                let c = state.copy();
                c.doAction(actions[a]);

                value = Math.max(value, self.AlphaBeta(c, alpha, beta, d - 1, !max)[0]);
                if (value > alpha) {
                    alpha = value;
                    if (d == self.maxD) {
                        bestAction = actions[a];
                    }
                }
                if (alpha >= beta) {
                    break;
                }

                // if (d == self.maxD) {
                //     break;
                // }
            }


            return [value, bestAction];

        } else if (!max) {

            let value = 10000;
            for (let a = 0; a < actions.length; a++) {


                let c = state.copy();
                c.doAction(actions[a]);
                value = Math.min(value, self.AlphaBeta(c, alpha, beta, d - 1, max)[0]);
                beta = Math.min(beta, value);

                if (alpha >= beta) {
                    break;
                }
            }

            return [value, bestAction];
        }


        // here is the syntax to calculate how much time has elapsed since the search began
        // you should compare this to self.config.

        // return the value

    }



    return self;
}