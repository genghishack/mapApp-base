export var getLegislatorsByState = function (legislators) {
    var index = {};
    legislators.forEach(function (legislator) {
        var _a = legislator.bio[0], first = _a.first, last = _a.last, middle = _a.middle, official_full = _a.official_full;
        legislator.name = { first: first, last: last, middle: middle, official_full: official_full };
        var term = legislator.term;
        var _b = term[0], state = _b.state, type = _b.type, state_rank = _b.state_rank, district = _b.district;
        index[state] = index[state] || {};
        index[state][type] = index[state][type] || {};
        if (type === 'sen') {
            index[state][type][state_rank] = {
                bioguide_id: legislator.bioguide_id,
                name: legislator.name,
                bio: legislator.bio[0],
                terms: legislator.term,
                id: legislator.ids[0]
            };
        }
        if (type === 'rep') {
            index[state][type][district] = {
                bioguide_id: legislator.bioguide_id,
                name: legislator.name,
                bio: legislator.bio[0],
                terms: legislator.term,
                id: legislator.ids[0]
            };
        }
    });
    // console.log(index);
    return index;
};
