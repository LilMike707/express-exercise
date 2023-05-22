const express = require('express');
const app = express();


console.log('Hello')

app.get('/mean', (req, res) => {
    const nums = req.query.nums;

    if (!nums) {
        return res.status(400).json({error: 'Numbers are required'})
    }

    const numbers = nums.split(',').map(Number)

    if (numbers.some(isNaN)) {
        return res.status(400).json({error: 'Contains invalid number'})
    }

    const mean = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length

    res.json({operation: 'mean', value: mean})
})


app.get('/median', (req, res) => {
    const nums = req.query.nums

    if (!nums) {
        return res.status(400).json({error: 'Numbers are required'})
    }

    const numbers = nums.split(',').map(Number)

    if (numbers.some(isNaN)) {
        return res.status(400).json({error: 'Contains invalid number'})
    }    

    numbers.sort((a, b) => a - b);
    const median = numbers[Math.floor(numbers.length / 2)];

    res.json({ operation: 'median', value: median });

})


app.get('/mode', (req, res) => {
    const nums = req.query.nums

    if (!nums) {
        return res.status(400).json({error: 'Numbers are required'})
    }

    const numbers = nums.split(',').map(Number)

    if (numbers.some(isNaN)) {
        return res.status(400).json({error: 'Contains invalid number'})
    } 

    const frequencyMap = {};
    let mode;
    let maxFrequency = 0;
  
    numbers.forEach((num) => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  
      if (frequencyMap[num] > maxFrequency) {
        maxFrequency = frequencyMap[num];
        mode = num;
      }
    });
  
    res.json({ operation: 'mode', value: mode });
})



app.listen(3000, function() {
    console.log(`Server starting on port 3000`);
  });