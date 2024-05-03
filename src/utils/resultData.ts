export interface result_data_object {
  isa: number;
  mse: number;
  ese: number;
}

export interface grade_data_object {
  letter: String;
  grade: number;
}

const data: Array<result_data_object> = [
  {
    isa: 20,
    mse: 30,
    ese: 50,
  },
  {
    isa: 25,
    mse: 0,
    ese: 25,
  },
  {
    isa: 50,
    mse: 0,
    ese: 100,
  },
];

const gradeData: Array<grade_data_object> = [
  {
    letter: "O",
    grade: 10,
  },
  { letter: "A", grade: 9 },
  { letter: "B", grade: 8 },
  { letter: "C", grade: 7 },
  { letter: "D", grade: 6 },
  { letter: "E", grade: 5 },
  { letter: "P", grade: 4 },
  { letter: "F", grade: 0 },
];

export const resultDetails = (course_id: string): result_data_object => {
  if (course_id.includes("C")) {
    return data[0];
  } else if (course_id.includes("DO")) {
    return data[0];
  } else if (course_id.includes("L")) {
    return data[1];
  } else if (course_id.includes("M")) {
    return data[1];
  } else {
    return data[2];
  }
};

export const marksToGrade = (marks: number): grade_data_object => {
  if (marks >= 80.0) {
    return gradeData[0];
  } else if (marks >= 75.0 && marks <= 79.99) {
    return gradeData[1];
  } else if (marks >= 70.0 && marks <= 74.99) {
    return gradeData[2];
  } else if (marks >= 60.0 && marks <= 69.99) {
    return gradeData[3];
  } else if (marks >= 50.0 && marks <= 59.99) {
    return gradeData[4];
  } else if (marks >= 45.0 && marks <= 49.99) {
    return gradeData[5];
  } else if (marks >= 40.0 && marks <= 44.99) {
    return gradeData[5];
  } else {
    return gradeData[gradeData.length - 1];
  }
};
