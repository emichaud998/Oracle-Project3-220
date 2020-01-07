//type Hire = { company: number, candidate: number }
//wheat1(companies: number[][], candidates: number[][]): Hire[]
//chaff1(companies: number[][], candidates: number[][]): Hire[]

//generateInput(n: number): number[][]
function generateInput(n){
  let result = []; 
  for (let i = 0; i < n; ++i){
    result.push([]); //Pushing this to each element of the result array makes it a double array
    //Adds n random numbers to each array in the result array- no duplicate numbers in each array
    for (let j = 0; j < n; ++j){
      let input = randomInt(0, n);
      //Keep taking random numbers until the input is not already in the array
      while ((result[i]).includes(input)){
        input = randomInt(0, n);        
      }
      result[i].push(input);
    }
  }
  return result;
}

//oracle(f: (candidates: number[][], companies: number[][]) => Hire[]): void
function oracle(f){
  let numTests = 20; // Change this to some reasonably large value
  for (let i = 0; i < numTests; ++i) {
    let n = 6; // Change this to some reasonable size
    let companies = generateInput(n);
    let candidates = generateInput(n);
    let hires = f(companies, candidates);
    test('Hires length is correct', function() {
      assert(companies.length === hires.length);
    });
    test('Hired is correct', function() {
      assert(hiredCorrect(companies, candidates, hires) === true);
    });
    }
}

//hiredCorrect(companies: number[][], candidates: number[][], hires: Hire[]): boolean
function hiredCorrect(companies, candidates, hires){
  //for loop evaluates each hired candidate and company pairing
  for(let i = 0; i < hires.length; ++i){
    let company = hires[i].company;
    let candidate = hires[i].candidate;

    let prefCand = companies[company][0]; //The number one prefered candidate of the company we are evaluating
    let prefComp = candidates[candidate][0] //The number one prefered company of the candidate we are evaluating
    
    //If the preferred candidate of the company and the preferred company of the candidate are the same, they 
    //Are each others number one choices and therefore this is a stable match
    if (prefCand === candidate && prefComp === company){
      continue;
    }

    //If the preferred company of the candidate we are evaluating does not equal the company it is paired with:
    if (prefComp !== company){
      //Iterate through the preferred company candidates preferences array and see if company prefers the candidate being evaluated over its pair in Hire[]
      for (let j = 0; j < companies[prefComp].length; ++j){
        let candMatch = findCompMatch(hires, prefComp); //Returns the candidate pair to the preffered company in Hire[]
        
        //If we get to the companies match in Hire[] before the candidate that prefers it, company would not rather match with candidate-stable
        if (companies[prefComp][j] === candMatch){
          break;
        }
        //If we get to the candidate being evaluated before the companies pairing in Hire[], the company would rather pair with the candidate- unstable
        else if (companies[prefComp][j] === candidate){
          return false;
        }
      }
    }

    //If the preferred candidate of the company we are evaluating does not equal the candidate it is paired with:
    if (prefCand !== candidate){
      //Iterate through the preferred candidate's company preferences array and see if candidate prefers the company being evaluated over its pair in Hire[]
      for (let j = 0; j < candidates[prefCand].length; ++j){
        let compMatch = findCandMatch(hires, prefCand); //Returns the company pair to the preffered candidate in Hire[]
        
        //If we get to the candidate's match in Hire[] before the company that prefers it, candidate would not rather match with that company-stable
        if (candidates[prefCand][j] === compMatch){
          break;
        }
        //If we get to the company being evaluated before the candidate's pairing in Hire[], the candidate would rather pair with that company- unstable
        else if (candidates[prefCand][j] === company){
          return false;
        }
      }
    }
  }
  return true;
}

//Finds a companies hired candidate pair in Hired[] and returns it
function findCompMatch(hires, company){
  for (let i = 0; i < hires.length; ++i){
    if (hires[i].company === company){
      return hires[i].candidate;
    }
  }
}

//Finds a hired candidates paired company in Hired[] and returns it
function findCandMatch(hires, candidate){
  for (let i = 0; i < hires.length; ++i){
    if (hires[i].candidate === candidate){
      return hires[i].company;
    }
  }
}

// Returns a random int i where min <= i < max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

oracle(wheat1);
oracle(chaff1);