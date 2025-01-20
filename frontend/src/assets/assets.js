import Doctor1 from './Doctor1.png';
import Doctor2 from './Doctor2.png';
import doctor3 from './doctor3.png';
import doctor4 from './doctor4.png';
import doctor5 from './doctor5.png';
import doctor6 from './doctor6.png';
import femaleDoctor1 from './femaleDoctor1.png';
import femaleDoctor2 from './femaleDoctor2.png';
import femaleDoctor3 from './femaleDoctor3.png';
import femaleDoctor4 from './femaleDoctor4.png';
import femaleDoctor5 from './femaleDoctor5.png';
import femaleDoctor6 from './femaleDoctor6.png';
import femaleDoctor7 from './femaleDoctor7.png';
import femaleDoctor8 from './femaleDoctor8.png';
import femaleDoctor9 from './femaleDoctor9.png';
import femaleDoctor10 from './femaleDoctor10.png';
import femaleDoctor11 from './femaleDoctor11.png';
import logo from './logo.png';
import profilepic1 from './profilepic1.png';
import dropdownicon from './dropdownicon.png';
import doctors1 from './doctors1.png';
import arrowicon from'./arrowicon.png';
import doctors2 from './doctors2.png';
import cartoondoc1 from './cartoondoc1.png';
import cartoondoc2 from './cartoondoc2.png';
import cartoondoc3 from './cartoondoc3.png';
import cartoondocfemale1 from './cartoondocfemale1.png';
import cartoondocfemale2 from './cartoondocfemale2.png';
import cartoondocfemale3 from './cartoondocfemale3.png';
import appointment_img from './appointment_img.png';


    export const assets= {
        Doctor1,
        Doctor2,
        doctor3,
        doctor4,
        doctor5,
        doctor6,
        femaleDoctor1,
        femaleDoctor2,
        femaleDoctor3,
        femaleDoctor4,
        femaleDoctor5,
        femaleDoctor6,
        femaleDoctor7,
        femaleDoctor8,
        femaleDoctor9,
        femaleDoctor10,
        femaleDoctor11,
        logo,
        profilepic1,
        dropdownicon,
        doctors1,
        arrowicon,
        doctors2,
        cartoondoc1,
        cartoondoc2,
        cartoondoc3,
        cartoondocfemale1,
        cartoondocfemale2,
        cartoondocfemale3,
        appointment_img,
    }
    export const specialityData = [
        {
            speciality: 'General physician',
            image: cartoondoc1
        },
        {
            speciality: 'Gynecologist',
            image: cartoondocfemale1
        },
        {
            speciality: 'Dermatologist',
            image: cartoondocfemale2
        },
        {
            speciality: 'Neurologist',
            image: cartoondoc2
        },
        {
            speciality: 'Gastroenterologist',
            image: cartoondocfemale3
        },
        {
            speciality: 'Urologist',
            image: cartoondoc3
        }

    ]
    export const doctors= [
        {
            _id: 'doc1',
            name: 'Dr. Abdul Kalam',
            image: Doctor1,
            speciality: 'General physician',
            degree: 'MBBS',
            experience: '7 Years',
            about: 'Dr. Kalam has a strong commitment to deliver comprehensive medical care & is a great General physician.',
            fees: 1000,
            address: {
                line1: 'Anita Diagnostic Center',
                line2: '480, DIT Road, Malibag, Dhaka'
            }
        },
        {
            _id: 'femaleDoc1',
            name: 'Dr. Farhana Alam',
            image: femaleDoctor1,
            speciality: 'Gynecologist',
            degree: 'MBBS, FCPS (Gynecology)',
            experience: '9 Years',
            about: 'Dr. Alam is dedicated to women\'s health and well-being.',
            fees: 1000,
            address: {
              line1: 'Mother & Child Care Center',
              line2: '78/B, Dhanmondi, Dhaka'
            }
        },
        {
            _id: 'femaleDoc2',
            name: 'Dr. Sumaiya Rahman',
            image: femaleDoctor2,
            speciality: 'Dermatologist',
            degree: 'MBBS, DDV',
            experience: '8 Years',
            about: 'Dr. Rahman is expert in skin and hair care and treatments.',
            fees: 1000,
          address: {
              line1: 'Skin and Care Clinic',
              line2: '100, Banani, Dhaka'
            }
        },
        {
            _id: 'doc1',
            name: 'Dr.Richard James',
            image: Doctor2,
            speciality: 'Neurologist',
            degree: 'MBBS, PhD (Neurology)',
            experience: '12 Years',
            about: 'Dr. Richard specializes in neurological disorders and treatment.',
            fees: 2000,
              address: {
                line1: 'Neuroscience Clinic',
                line2: '123, Gulshan Avenue, Dhaka'
              }
        },
        {
            _id: 'doc2',
            name: 'Dr. Mahmud Khan',
            image: doctor3,
            speciality: 'Gastroenterologist',
            degree: 'MBBS, MD (Gastroenterology)',
            experience: '10 Years',
            about: 'Dr. Khan is an expert in digestive system disorders.',
            fees: 1500,
            address: {
                line1: 'Digestive Health Center',
                line2: '456, Mirpur, Dhaka'
              }
        },
        {
            _id: 'femaleDoc3',
            name: 'Dr. Nusrat Jahan',
            image: femaleDoctor3,
            speciality: 'Pediatrician',
            degree: 'MBBS, FCPS (Pediatrics)',
            experience: '11 Years',
            about: 'Dr. Jahan is passionate about child health and development.',
             fees: 1500,
             address: {
                 line1: 'Child Care Clinic',
                line2: '789, Uttara, Dhaka'
              }
        },
        {
            _id: 'femaleDoc4',
            name: 'Dr. Ayesha Siddika',
            image: femaleDoctor4,
            speciality: 'Ophthalmologist',
            degree: 'MBBS, DO',
            experience: '13 Years',
            about: 'Dr. Siddika is dedicated to eye care and vision correction.',
            fees: 1000,
              address: {
                  line1: 'Eye Care Center',
                  line2: '90/A, Banani, Dhaka'
              }
        },
        {
            _id: 'femaleDoc5',
            name: 'Dr. Tahmina Haque',
            image: femaleDoctor5,
            speciality: 'Endocrinologist',
             degree: 'MBBS, MD (Endocrinology)',
            experience: '7 Years',
            about: 'Dr. Haque specializes in hormonal disorders and metabolic diseases.',
             fees: 1000,
               address: {
                   line1: 'Hormone and Metabolic Clinic',
                  line2: '67/B, Gulshan, Dhaka'
               }
        },
        {
            _id: 'femaleDoc6',
            name: 'Dr. Lamia Khan',
            image: femaleDoctor6,
            speciality: 'Cardiologist',
            degree: 'MBBS, MD (Cardiology)',
            experience: '10 Years',
            about: 'Dr. Khan is a skilled cardiologist with a focus on preventative care.',
            fees: 1500,
              address: {
                  line1: 'Heart Care Center',
                  line2: '50, Dhanmondi, Dhaka'
                }
        },
        {
            _id: 'femaleDoc7',
            name: 'Dr. Maliha Zaman',
            image: femaleDoctor7,
            speciality: 'Oncologist',
            degree: 'MBBS, FCPS (Oncology)',
            experience: '15 Years',
            about: 'Dr. Zaman is an expert in cancer diagnosis and treatment.',
            fees: 2000,
              address: {
                  line1: 'Cancer Treatment Hospital',
                  line2: '88/C, Mirpur, Dhaka'
                }
        },
        {
            _id: 'Doc3',
            name: 'Dr. Imran Hossain',
            image: doctor3,
            speciality: 'Urologist',
            degree: 'MBBS, MS (Urology)',
            experience: '14 Years',
            about: 'Dr. Hossain specializes in the urinary tract and male reproductive system.',
            fees: 1000,
            address: {
              line1: 'Urology Center',
               line2: '22/A, Uttara, Dhaka'
             }
        },
        {
            _id: 'Doc4',
            name: 'Dr. Faisal Ahmed',
            image: doctor4,
            speciality: 'Pulmonologist',
            degree: 'MBBS, MD (Pulmonology)',
            experience: '9 Years',
            about: 'Dr. Ahmed focuses on respiratory diseases and lung health.',
            fees: 1500,
            address: {
               line1: 'Lung Care Clinic',
                line2: '44/B, Gulshan, Dhaka'
              }
        }
    ]