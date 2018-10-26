plyr = Player_Student({})
s = GameState(7,6)

foo = function(a){
    let t = s.copy();
    t.doAction(a)
    
}

t = s.copy();
// t.player = 0;
// t.doAction(3);
// t.player = 0;
// t.doAction(3);
// t.player = 0;
// t.doAction(3);
t.player = 1;
t.doAction(0);
t.player = 1;
t.doAction(0);
t.player = 0;
t.doAction(3);
t.player = 0;
t.doAction(3);
t.player = 0;
t.doAction(3);
// t.player = 0;
// t.doAction(4);
// t.player = 1;                  
console.log('t: ', t.board);

// console.log('plyr.eval(t,1): ', plyr.eval(t,0));
console.log('t.player: ', t.player);
console.log('plyr.getAction(t): ', plyr.getAction(t));

w = 3
h = 7
x = 1
y = 3

truncate = function (x) {
    return x > 3 ? 3 : x;
}

n_groups_by_4 = function (x) {
    return x < 4 ? 0 : x - 3;
}

left_ = truncate(x);
right_ = truncate(Math.abs(w - x) - 1);
top_ = truncate(Math.abs(h - y) - 1);
bttm_ = truncate(y)


nw = n_groups_by_4(Math.min(left_, top_) + Math.min(right_, bttm_) + 1);
ne = n_groups_by_4(Math.min(right_, top_) + Math.min(left_, bttm_) + 1);
hrzntl = n_groups_by_4(right_ + left_ + 1);
vrtcl = n_groups_by_4(top_ + bttm_ + 1);

score = nw + ne + hrzntl + vrtcl;