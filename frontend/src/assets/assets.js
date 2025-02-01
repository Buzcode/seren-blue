import doctor1 from './doctor1.png';
import doctor2 from './doctor2.png';
import doctor3 from './doctor3.png';
import doctor4 from './doctor4.png';
import doctor5 from './doctor5.png';
import doctor6 from './doctor6.png';
import doctor7 from './doctor7.png';
import doctor8 from './doctor8.png';
import doctor9 from './doctor9.png';
import doctor10 from './doctor10.png';
import doctor11 from './doctor11.png';
import doctor12 from './doctor12.png';
import doctor13 from './doctor13.png';
import doctor14 from './doctor14.png';
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
import femaleDoctor12 from './femaleDoctor12.png';
import femaleDoctor13 from './femaleDoctor13.png';
import femaleDoctor14 from './femaleDoctor14.png';
import femaleDoctor15 from './femaleDoctor15.png';
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
import about_image from './about_image.png';
import info_icon from './info_icon.png';
import contact_image from './contact_image.png';
import ac_ambulance from './ac_ambulance.png';
import icu_ambulance from './icu_ambulance.png';
import air_ambulance from './air_ambulance.png';
import icu_ambulance2 from './icu_ambulance2.png';
import icu_ambulance3 from './icu_ambulance3.png';
import ct_scan from './ct_scan.png';
import blood_tests from './blood_tests.png';
import endoscopy from './endoscopy.png';
import ultrasound from './ultrasound.png';
import xray from './xray.png';
import microbiology from './microbiology.png';
import ac_ambulance2 from './ac_ambulance2.png';
import ac_ambulance3 from './ac_ambulance3.png';
import air_ambulance2 from './air_ambulance2.png';
import air_ambulance3 from './air_ambulance3.png';

    export const assets= {
        doctor1,
        doctor2,
        doctor3,
        doctor4,
        doctor5,
        doctor6,
        doctor7,
        doctor8,
        doctor9,
        doctor10,
        doctor11,
        doctor12,
        doctor13,
        doctor14,
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
        femaleDoctor12,
        femaleDoctor13,
        femaleDoctor14,
        femaleDoctor15,
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
        about_image,
        info_icon,
        contact_image,
        ac_ambulance,
        icu_ambulance,
        air_ambulance,
        icu_ambulance2,
        icu_ambulance3,
        ct_scan,
        blood_tests,
        endoscopy,
        ultrasound,
        xray,
        microbiology,
        ac_ambulance2,
        ac_ambulance3,
        air_ambulance2,
        air_ambulance3,
        
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
            image: doctor1,
            speciality: 'General physician',
            degree: 'MBBS, MD, WBBS, DCH, FFM',
            experience: '7 Years',
            about: 'Dr. Abdul Kalam is a dedicated and highly qualified General Physician with over 7 years of experience in providing comprehensive medical care. He holds a WBBS degree and has further enhanced his expertise with additional qualifications, including a Diploma in Child Health (DCH) and a Fellowship in Family Medicine (FFM). Dr. Kalam is committed to delivering patient-centered care, focusing on preventive health, chronic disease management, and overall wellness. Known for his compassionate approach and clinical excellence, he practices at Anita Diagnostic Center in Malibag, Dhaka, where he ensures personalized and effective treatment for all his patients.',
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
            degree: 'MBBS, FCPS (Gynecology), MRCOG(UK), DGO',
            experience: '9 Years',
            about: 'Dr. Farhana Alam is a highly skilled and compassionate Gynecologist with over 9 years of experience in women\'s health. She holds an MBBS degree and has achieved her FCPS in Gynecology, along with additional qualifications such as MRCOG (UK) and a Diploma in Obstetrics and Gynecology (DGO). Dr. Alam is deeply committed to providing comprehensive care for women, specializing in prenatal and postnatal care, family planning, and managing gynecological disorders. Her patient-centered approach and dedication to women\'s well-being have made her a trusted name in her field. Dr. Alam practices at the Mother & Child Care Center in Dhammondi, Dhaka, where she offers personalized and empathetic care to her patients.',
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
            degree: 'MBBS, DDV, MD(Dermatology and Cosmetic Dermatology)',
            experience: '8 Years',
            about: 'Dr. Sumaiya Rahman is a highly accomplished Dermatologist with over 8 years of experience in skin and hair care. She holds an MBBS degree and a DDV (Diploma in Dermatology and Venereology), along with additional qualifications such as MD in Dermatology and a Fellowship in Cosmetic Dermatology. Dr. Rahman specializes in treating a wide range of skin conditions, including acne, eczema, psoriasis, and hair disorders, as well as offering advanced cosmetic procedures. Known for her expertise and patient-centered approach, she is dedicated to providing effective and personalized treatments. Dr. Rahman practices at the Skin and Care Clinic in Banani, Dhaka, where she helps patients achieve healthy and radiant skin.',
            fees: 1000,
          address: {
              line1: 'Skin and Care Clinic',
              line2: '100, Banani, Dhaka'
            }
        },
        {
            _id: 'doc2',
            name: 'Dr.Richard James',
            image: doctor2,
            speciality: 'Neurologist',
            degree: 'MBBS, PhD (Neurology), MRCP (Clinical Neurophysiology)',
            experience: '12 Years',
            about: 'Dr. Richard James is a Neurologist with over 12 years of expertise in diagnosing and treating complex neurological disorders. He holds an MBBS degree, a PhD in Neurology, and has further enriched his qualifications with an MRCP (UK) in Neurology and a Fellowship in Clinical Neurophysiology. Dr. James specializes in managing conditions such as epilepsy, stroke, multiple sclerosis, and neurodegenerative diseases. Known for his innovative approach and dedication to patient care, he combines advanced diagnostic techniques with personalized treatment plans. Dr. James practices at the Neuroscience Clinic on Gulshan Avenue, Dhaka, where he is committed to improving the neurological health and quality of life for his patients.',
            fees: 2000,
              address: {
                line1: 'Neuroscience Clinic',
                line2: '123, Gulshan Avenue, Dhaka'
              }
        },
        {
            _id: 'doc3',
            name: 'Dr. Mahmud Khan',
            image: doctor3,
            speciality: 'Gastroenterologist',
            degree: 'MBBS, MD (Gastroenterology), MRCP(Advanced Endoscopy)',
            experience: '10 Years',
            about: 'Dr. Mahmud Khan is a highly skilled Gastroenterologist with over 10 years of experience in diagnosing and treating digestive system disorders. He holds an MBBS degree and an MD in Gastroenterology, complemented by additional qualifications such as MRCP (UK) in Gastroenterology and a Fellowship in Advanced Endoscopy. Dr. Khan specializes in managing conditions like irritable bowel syndrome (IBS), liver diseases, peptic ulcers, and gastrointestinal cancers. Known for his patient-centered approach and expertise in minimally invasive procedures, he is dedicated to providing comprehensive and effective care. Dr. Khan practices at the Digestive Health Center in Mirpur, Dhaka, where he is committed to improving his patients\' digestive health and overall well-being.',
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
            degree: 'MBBS, FCPS (Pediatrics),  MRCPCH (UK), DCH',
            experience: '7 Years',
            about: 'Dr. Nusrat Jahan is a dedicated and compassionate Pediatrician with over 7 years of experience in child health and development. She holds an MBBS degree and an FCPS in Pediatrics, along with additional qualifications such as MRCPCH (UK) and a Diploma in Child Health (DCH). Dr. Jahan specializes in neonatal care, childhood vaccinations, and managing common pediatric illnesses. Known for her gentle approach and commitment to her young patients, she provides comprehensive and personalized care to ensure the healthy growth and development of children. Dr. Jahan practices at the Child Care Clinic in Uttara, Dhaka, where she is a trusted name in pediatric healthcare.',
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
            degree: 'MBBS, DO, FRCS (Ophth)',
            experience: '8 Years',
            about: 'Dr. Ayesha Siddika is a dedicated and skilled Ophthalmologist with extensive experience in eye care and vision correction. She holds an MBBS degree and a DO (Diploma in Ophthalmology), along with additional qualifications such as FRCS (Ophth) and a Fellowship in Cornea and Refractive Surgery. Dr. Siddika specializes in cataract surgery, glaucoma management, and laser vision correction. Known for her meticulous approach and commitment to patient care, she provides comprehensive and personalized treatment to ensure optimal eye health. Dr. Siddika practices at the Eye Care Center in Banani, Dhaka, where she is trusted for her expertise and compassionate care.',
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
            about: 'Dr. Tahmina is a dedicated and board-certified Endocrinologist with over 7 years of experience in managing complex hormonal and metabolic disorders. Specializing in diabetes, thyroid conditions, osteoporosis, and adrenal disorders, she is passionate about providing personalized, evidence-based care to her patients. Dr. Tahmina is known for her compassionate approach and commitment to educating patients about their health, empowering them to achieve optimal well-being. With a focus on the latest advancements in endocrinology, she ensures comprehensive and tailored treatment plans for every individual.',
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
            degree: 'MBBS, MD (Cardiology), MRCP(UK)',
            experience: '10 Years',
            about: 'Dr. Lamia Khan is a highly qualified and experienced Cardiologist with over 10 years of expertise in cardiovascular medicine. She holds an MBBS, MD in Cardiology, and additional advanced degrees including MRCP (UK) and Fellowship in Interventional Cardiology. Specializing in preventative care, heart disease management, and advanced interventional procedures, Dr. Khan is dedicated to providing comprehensive and patient-centered care. Her expertise includes managing conditions such as hypertension, heart failure, arrhythmias, and coronary artery disease. Dr. Khan practices at the Heart Care Center in Dhammondi, Dhaka, where she is known for her compassionate approach, clinical excellence, and commitment to improving her patient\'s heart health and overall well-being.',
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
            degree: 'MBBS, FCPS (Oncology),  MRCP (UK)',
            experience: '10 Years',
            about: 'Dr. Maliha Zaman is a highly experienced and dedicated Oncologist with over 15 years of expertise in cancer diagnosis and treatment. She holds an MBBS degree and an FCPS in Oncology, complemented by additional qualifications such as MRCP (UK) in Oncology and a Fellowship in Medical Oncology. Dr. Zaman specializes in chemotherapy, targeted therapy, and palliative care, providing comprehensive and compassionate treatment to her patients. Known for her patient-centered approach and commitment to advancing cancer care, she practices at the Cancer Treatment Hospital in Mirpur, Dhaka, where she is a trusted name in oncology.',
            fees: 2000,
              address: {
                  line1: 'Cancer Treatment Hospital',
                  line2: '88/C, Mirpur, Dhaka'
                }
        },
        {
            _id: 'Doc5',
            name: 'Dr. Imran Hossain',
            image: doctor5,
            speciality: 'Urologist',
            degree: 'MBBS, MS (Urology), FRCS (Urol)',
            experience: '11 Years',
            about: 'Dr. Imran Hossain is a highly skilled Urologist with over 11 years of experience in treating disorders of the urinary tract and male reproductive system. He holds an MBBS degree and an MS in Urology, along with additional qualifications such as FRCS (Urol) and a Fellowship in Endourology and Minimally Invasive Surgery. Dr. Hossain specializes in kidney stones, prostate conditions, and urologic cancers, utilizing advanced surgical techniques and personalized treatment plans. Known for his expertise and compassionate care, he practices at the Urology Center in Uttara, Dhaka, where he is dedicated to improving his patients\' urological health and quality of life.',
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
            degree: 'MBBS, MD (Pulmonology), FCPS (Pulmonology), Fellowship in Interventional Pulmonology',
            experience: '9 Years',
            about: 'Dr. Faisal Ahmed is a highly experienced and dedicated pulmonologist specializing in the diagnosis and treatment of respiratory diseases. With a patient-centered approach, he is committed to providing comprehensive care for a wide range of conditions, including asthma, COPD, pneumonia, and other complex lung disorders. Dr. Ahmed is passionate about helping patients improve their breathing and enhance their overall quality of life. He is actively involved in research and strives to stay at the forefront of advancements in pulmonology. His expertise also extends to interventional pulmonology procedures.',
            fees: 1500,
            address: {
               line1: 'Lung Care Clinic',
                line2: '44/B, Gulshan, Dhaka'
              }
        },
        {
            _id: 'femaleDoc12',
            name: 'Dr. Shayma Khan',
            image: femaleDoctor12,
            speciality: 'Gynecologist',
            degree: 'MBBS, FCPS (Gynecology), MRCOG (Obstetricians and Gynaecologists) ,Fellowship in Reproductive Endocrinology and Infertility',
            experience: '5 Years',
            about: 'Dr. Shayma Khan is a dedicated and compassionate Gynecologist with over 5 years of experience in women\'s health. She holds an MBBS degree and an FCPS in Gynecology, along with additional qualifications such as MRCOG (UK) and a Diploma in Obstetrics and Gynecology (DGO). Dr. Khan specializes in prenatal and postnatal care, family planning, and managing gynecological disorders. Known for her patient-centered approach and commitment to women\'s well-being, she provides comprehensive and personalized care. Dr. Khan practices at the Mother & Child Care Center in Dhammondi, Dhaka, where she is trusted for her expertise and empathetic care.',
            fees: 1200,
            address: {
              line1: 'Mother & Child Care Center',
              line2: '78/B, Dhanmondi, Dhaka'
            }
        },
        {
            _id: 'femaleDoc13',
            name: 'Dr. Rima Khan',
            image: femaleDoctor13,
            speciality: 'Dermatologist',
            degree: 'MBBS, FCPS, DDV (Diploma in Dermatology and Venereology), Fellowship in Cosmetic Dermatology ',
            experience: '4 Years',
            about: 'Dr. Rima Khan is a dedicated and compassionate dermatologist with a passion for skin health. She has extensive experience in diagnosing and treating a wide range of dermatological conditions, from common skin problems to complex diseases. Dr. Khan is committed to providing personalized care, focusing on each patient\'s individual needs and concerns. She stays up-to-date with the latest advancements in dermatology to ensure her patients receive the most effective treatments. Her areas of expertise include acne, eczema, psoriasis, skin cancer screening, and cosmetic dermatology. ',
            fees: 1500,
            address: {
              line1: 'Dermatology Center',
              line2: '78/B, Dhanmondi, Dhaka'
            }
        },
        {
            _id: 'femaleDoc14',
            name: 'Dr. Rima Khan',
            image: femaleDoctor14,
            speciality: 'Urologist',
            degree: 'MBBS, FCPS, MS in Urology,  ',
            experience: '5 Years',
            about: 'Dr. Rima Khan is a highly dedicated and experienced urologist committed to providing exceptional care to her patients. She possesses extensive knowledge in diagnosing and treating a wide range of urological conditions, including kidney stones, prostate issues, and urinary tract infections. Dr. Khan is passionate about improving patient outcomes and strives to stay at the forefront of advancements in urology. She is known for her compassionate approach and her ability to connect with patients on a personal level, ensuring they feel comfortable and well-informed throughout their treatment journey. ',
            fees: 1500,
            address: {
              line1: 'Urology Center',
              line2: '78/B, Panthapath, Dhaka'
            }
        },
        {
            _id: 'Doc7',
            name: 'Dr. Mahi',
            image: doctor7,
            speciality: 'Pulmonologist',
            degree: 'MBBS, FCPS, MRCP (UK), PhD in Respiratory Medicine',
            experience: '5 Years',
            about: 'Dr. Mahi is a dedicated and experienced pulmonologist specializing in the diagnosis and management of respiratory diseases. With a focus on patient-centered care, Dr. Mahi is committed to providing comprehensive treatment plans and promoting lung health. She is passionate about helping patients improve their breathing and enhance their quality of life. Her clinical expertise covers a wide range of conditions, including asthma, COPD, and other complex respiratory disorders. Dr. Mahi is actively involved in research and strives to stay abreast of the latest advancements in her field.',
            fees: 1500,
            address: {
               line1: 'Lung Care Clinic',
                line2: '44/B, Gulshan, Dhaka'
              }
        },
        {
            _id: 'Doc8',
            name: 'Dr. Jeon Jungkook',
            image: doctor8,
            speciality: 'Oncologist',
            degree: 'MBBS, FCPS',
            experience: '2 Years',
            about: 'Dr. Jeon is a highly skilled oncologist with a special interest in lung cancer. Her expertise lies in accurately diagnosing various types of cancer and developing personalized treatment plans tailored to each patient\'s unique needs. She is committed to providing compassionate care and strives to improve the lives of those affected by cancer.',
            fees: 1000,
            address: {
               line1: 'Lung Care Clinic',
                line2: '44/B, Gulshan, Dhaka'
              }
        },
        {
          _id: 'doc9',
            name: 'Dr. Rajin Mahmud',
            image: doctor9,
            speciality: 'General physician',
            degree: 'MBBS, FCPS',
            experience: '2 Years',
            about: 'Dr. Rajin is a general physician with a passion for whole-person care. He is experienced in diagnosing and treating a wide range of medical conditions.',
            fees: 1200,
            address: {
                line1: 'Anita Diagnostic Center',
                line2: '480, DIT Road, Malibag, Dhaka'
            }
        },
        {
          _id: 'femaleDoc8',
            name: 'Dr. Raina Yasmin',
            image: femaleDoctor8,
            speciality: 'General physician',
            degree: 'MBBS, FCPS',
            experience: '4 Years',
            about: 'Dr. Rajin is a general physician for 4 years. She provides comprehensive care from preventative services to manage chronic illness.',
            fees: 1200,
            address: {
                line1: 'Anita Diagnostic Center',
                line2: '480, DIT Road, Malibag, Dhaka'
            }
        },
        {
          _id: 'femaleDoc9',
            name: 'Dr. Mahmuda Kalpona',
            image: femaleDoctor9,
            speciality: 'General physician',
            degree: 'MBBS, FCPS',
            experience: '6 Years',
            about: 'Dr. Kalpona is a general physician with over 6 years of experience in diagnosing and managing a wide range of acute and chronic medical conditions.',
            fees: 2000,
            address: {
                line1: 'Anita Diagnostic Center',
                line2: '480, DIT Road, Malibag, Dhaka'
            }
        },
        {
          _id: 'femaleDoc10',
          name: 'Dr. Bobita Karim',
          image: femaleDoctor10,
          speciality: 'Pediatrician',
          degree: 'MBBS, FCPS',
          experience: '4 Years',
          about: 'Dr. Bobita is dedicated to child\'s health and well-being. She is highly skilled and compassionate as a pediatrician',
          fees: 1200,
          address: {
            line1: 'Mother & Child Care Center',
            line2: '78/B, Dhanmondi, Dhaka'
          }
        },
        {
          _id: 'femaleDoc11',
          name: 'Dr. Nazneen Khan',
          image: femaleDoctor11,
          speciality: 'Gynecologist',
          degree: 'MBBS, FCPS (Gynecology)',
          experience: '4 Years',
          about: 'Dr. Nazneen is dedicated to women\'s health and well-being. She has great experties in reproductive health, prenatal care, and managing gynecological conditions.',
          fees: 1400,
          address: {
            line1: 'Mother & Child Care Center',
            line2: '78/B, Dhanmondi, Dhaka'
          }
        },
        {
          _id: 'doc6',
          name: 'Dr.Sadat Yusuf',
          image: doctor6,
          speciality: 'Neurologist',
          degree: 'MBBS, FCPS',
          experience: '4 Years',
          about: 'Dr.Yusuf is emeritus Professor of Neurology and was the Parker Webber Chair in Neurology, a tenured Professor of Neurology and Professor of Biochemistry, Microbiology and Immunology at Wayne State University School of Medicine.',
          fees: 2000,
            address: {
              line1: 'Neuroscience Clinic',
              line2: '123, Gulshan Avenue, Dhaka'
            }
        },
        {
          _id: 'doc10',
          name: 'Dr. Nuhash Mahmud',
          image: doctor10,
          speciality: 'Gastroenterologist',
          degree: 'MBBS, MD (Gastroenterology),  MRCP (UK)',
          experience: '10 Years',
          about: 'Dr. Nuhash Mahmud is a highly experienced Gastroenterologist with over 10 years of expertise in diagnosing and treating digestive system disorders. He holds an MBBS degree and an MD in Gastroenterology, along with additional qualifications such as MRCP (UK) in Gastroenterology and a Fellowship in Advanced Endoscopy. Dr. Mahmud specializes in managing conditions like irritable bowel syndrome (IBS), liver diseases, peptic ulcers, and gastrointestinal cancers. Known for his patient-centered approach and expertise in minimally invasive procedures, he is dedicated to providing comprehensive and effective care. Dr. Mahmud practices at the Digestive Health Center in Mirpur, Dhaka, where he is committed to improving his patients\' digestive health and overall well-being.',
          fees: 1500,
          address: {
              line1: 'Digestive Health Center',
              line2: '456, Mirpur, Dhaka'
            }
        },
        {
          _id: 'doc11',
          name: 'Dr. Shuhad Ahmed',
          image: doctor11,
          speciality: 'Ophthalmologist',
          degree: 'MBBS, FCPS',
          experience: '10 Years',
          about: 'Dr. Shuhad is a highly skilled Ophthalmologist with 10 years of experience in diagnosing and treating eye disorders. Specializing in cataract surgery, glaucoma management, and refractive procedures, Dr. Shuhad is dedicated to providing personalized, cutting-edge eye care to ensure optimal vision health for all patients.',
          fees: 1200,
            address: {
                line1: 'Eye Care Center',
                line2: '90/A, Banani, Dhaka'
            }
        },
        {
          _id: 'doc12',
          name: 'Dr. Mukit Huda',
          image: doctor12,
          speciality: 'Ophthalmologist',
          degree: 'MBBS, FCPS',
          experience: '14 Years',
          about: ' Dr. Mukit is a board-certified Ophthalmologist with over 14 years of expertise in comprehensive eye care. Specializing in advanced cataract surgery, LASIK, glaucoma treatment, and diabetic eye care, Dr. Mukit is committed to delivering exceptional patient-centered care. With a focus on the latest medical advancements and a compassionate approach, Dr. Mukit strives to improve and preserve vision for patients of all ages. A trusted name in eye health, Dr. Mukit ensures every patient receives tailored treatment for their unique needs.',
          fees: 2000,
            address: {
                line1: 'Eye Care Center',
                line2: '90/A, Banani, Dhaka'
            }
        },
        {
          _id: 'femaleDoc15',
          name: 'Dr. Meherunnesa Islam',
          image: femaleDoctor15,
          speciality: 'Endocrinologist',
          degree: 'MBBS, FCPS',
          experience: '2 Years',
          about: ' Dr. Mehereunnesa Islam is a dynamic Endocrinologist with 2 years of hands-on experience in managing a wide range of hormonal and metabolic conditions. Her expertise includes diabetes care, thyroid dysfunction, and reproductive endocrine issues like PCOS. Known for her empathetic and thorough approach, Dr. Islam prioritizes building strong patient relationships and creating tailored treatment plans. She is committed to staying at the forefront of medical advancements to deliver innovative and effective care, ensuring her patients lead healthier, balanced lives.',
          fees: 1000,
            address: {
                line1: 'Popular Diagonistic Center',
                line2: '90/A, Banani, Dhaka'
            }
        },
        {
          _id: 'doc13',
          name: 'Dr. Asif Hossain',
          image: doctor13,
          speciality: 'Endocrinologist',
          degree: 'MBBS, FCPS',
          experience: '10 Years',
          about: ' Dr. Asif is a highly experienced and board-certified Endocrinologist with over 10 years of expertise in managing complex hormonal and metabolic disorders. Specializing in diabetes, thyroid diseases, pituitary disorders, and metabolic syndrome, he is renowned for his patient-centered approach and dedication to delivering high-quality care. Dr. Asif combines his extensive clinical knowledge with a compassionate bedside manner, ensuring personalized treatment plans for each patient. His commitment to advancing endocrinology through continuous learning and innovation makes him a trusted name in the field.',
          fees: 2000,
            address: {
                line1: 'Eye Care Center',
                line2: '90/A, Banani, Dhaka'
            }
        },
        {
          _id: 'doc14',
          name: 'Dr. Latin Khan',
          image: doctor14,
          speciality: 'Cardiologist',
          degree: 'MBBS, MD (Cardiology)',
          experience: '2 Years',
          about: 'Dr. Latin Khan is a dedicated and skilled Cardiologist with 2 years of experience in diagnosing and treating a wide range of heart-related conditions. Specializing in preventive cardiology, hypertension, and heart failure management, Dr. Khan is committed to providing compassionate and patient-focused care. With a strong foundation in the latest cardiovascular advancements, he strives to deliver tailored treatment plans to improve heart health and overall well-being for his patients. Dr. Khan’s approach combines clinical expertise with a genuine passion for helping individuals lead healthier lives.',
          fees: 1500,
            address: {
                line1: 'Heart Care Center',
                line2: '50, Dhanmondi, Dhaka'
              }
        }


        

    ]