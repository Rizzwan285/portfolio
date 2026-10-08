import type { Education } from './types.ts';

/** Education, newest first. `score` is optional — the B.Tech. shows its status instead. */
export const education: Education[] = [
  {
    id: 'iit-palakkad',
    institution: 'Indian Institute of Technology Palakkad',
    qualification: 'B.Tech. in Data Science and Engineering',
    status: 'Pursuing',
    years: '2023 – 2027',
    coursework: [
      {
        group: 'Data science and AI',
        courses: [
          'Introduction to AI',
          'Machine Learning',
          'Deep Learning',
          'Natural Language Processing',
          'Data Analytics',
          'Big Data Lab',
        ],
      },
      {
        group: 'Computer science',
        courses: [
          'Data Structures and Algorithms',
          'Database Management Systems',
          'Computer Systems',
          'C Programming',
          'Systems Programming',
        ],
      },
      {
        group: 'Mathematics',
        courses: [
          'Probability and Statistics',
          'Linear Algebra',
          'Discrete Mathematics',
          'Multivariable Calculus',
          'Introduction to Optimization',
        ],
      },
    ],
  },
  {
    id: 'chavara',
    institution: 'Chavara Public School',
    place: 'Pala',
    qualification: 'Class 12, CBSE',
    score: '96.2%',
    years: '2023',
  },
  {
    id: 'sacred-heart',
    institution: 'Sacred Heart CMI Public School',
    place: 'Perinthalmanna',
    qualification: 'Class 10, CBSE',
    score: '98.2%',
    years: '2021',
  },
];
