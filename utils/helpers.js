if (!String.prototype.splice) {
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

const fromUnderScoreToCamelCase = (object) => {
    let resultObject;
    const modifyFieldNames = (element) => {
        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        const resultElement = {};
        for(const [key, value] of Object.entries(element)) {
            let resultKey = key;
            if (key.includes("_")) {
                let newKey = "";
                const splitKey = key.split("_");
                splitKey.forEach((value, index) => {
                    newKey = newKey + (index < 1 ? value : capitalizeFirstLetter(value));
                });
                resultKey = newKey;
            }
            if (typeof value === "object" && value !== null) {
                resultElement[resultKey] = fromUnderScoreToCamelCase(value);
            } else {
                resultElement[resultKey] = value;
            }
        }
        return resultElement;
    };

    if (Array.isArray(object)) {
        resultObject = [];
        object.forEach((item) => {
            resultObject.push(modifyFieldNames(item));
        });
        return resultObject;
    } else {
        return modifyFieldNames(object);
    }
}

const fromCamelCaseToUnderScore = (object) => {
    let resultObject;
    const modifyFieldNames = (element) => {
        const resultElement = {};
        for(const [key, value] of Object.entries(element)) {
            let resultKey = key;
            let numberOfReplaced = 0;
            for (var i = 0; i < key.length; i++) {
                if (key.charAt(i).toUpperCase() === key.charAt(i)) { // uppercase
                    resultKey = resultKey.splice(i + numberOfReplaced, 0, "_");
                    numberOfReplaced ++;
                }
            }
            resultKey = resultKey.toLowerCase();

            if (typeof value === "object" && value !== null) {
                resultElement[resultKey] = fromCamelCaseToUnderScore(value);
            } else {
                resultElement[resultKey] = value;
            }
        }
        return resultElement;
    }
    if (Array.isArray(object)) {
        resultObject = [];
        object.forEach((item) => {
            resultObject.push(modifyFieldNames(item));
        });
        return resultObject;
    } else {
        return modifyFieldNames(object);
    }
};

module.exports = {
    fromUnderScoreToCamelCase,
    fromCamelCaseToUnderScore
};
