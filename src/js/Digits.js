const zero = {
    row1: {
        upper: true,
        lower: false,
        row: ['|', '|']
    },
    row2: {
        lower: true,
        row: ['|', '|']
    }
};

const one = {
    row1: {
        upper: false,
        lower: false,
        row: ['', '|']
    },
    row2: {
        lower: false,
        row: ['', '|']
    }
};

const two = {
    row1: {
        upper: true,
        lower: true,
        row: ['', '|']
    },
    row2: {
        lower: true,
        row: ['|', '']
    }
};

const three = {
    row1: {
        upper: true,
        lower: true,
        row: ['', '|']
    },
    row2: {
        lower: true,
        row: ['', '|']
    }
};

const four = {
    row1: {
        upper: false,
        lower: true,
        row: ['|', '|']
    },
    row2: {
        lower: false,
        row: ['', '|']
    }
};

const five = {
    row1: {
        upper: true,
        lower: true,
        row: ['|', '']
    },
    row2: {
        lower: true,
        row: ['', '|']
    }
};

const six = {
    row1: {
        upper: true,
        lower: true,
        row: ['|', '']
    },
    row2: {
        lower: true,
        row: ['|', '|']
    }
};

const seven = {
    row1: {
        upper: true,
        lower: false,
        row: ['', '|']
    },
    row2: {
        lower: false,
        row: ['', '|']
    }
};

const eight = {
    row1: {
        upper: true,
        lower: true,
        row: ['|', '|']
    },
    row2: {
        lower: true,
        row: ['|', '|']
    }
};

const nine = {
    row1: {
        upper: true,
        lower: true,
        row: ['|', '|']
    },
    row2: {
        lower: true,
        row: ['', '|']
    }
};

const digits = {
    0: zero,
    1: one,
    2: two,
    3: three,
    4: four,
    5: five,
    6: six,
    7: seven,
    8: eight,
    9: nine
};

export default {
    get: function (digit) {
        return digits[digit] || null;
    }
}