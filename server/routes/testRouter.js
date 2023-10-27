const express = require('express');
const router = express.Router();

router.get('/query', (req, res) =>{
    console.log(req.query);
    const { name, age } = req.query;
    const response = `이름 : ${name} 나이 ${age}`;
    res.json({message:response})
  })
  
router.get('/', (req, res) =>{
    res.json({message:"GET /test 경로에 대한 응답"})
  })
  
router.get('/:name', (req, res) =>{
    console.log(req.params);
    res.json({message:"GET /test 경로에 대한 응답"})
  })
  
router.post('/', (req, res)=> {
    console.log(req.body);
    res.json({message:'post 요청에 대한 응답'})
  })

  module.exports = router;