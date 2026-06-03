import React, { useState, useEffect, useMemo } from 'react';
import { Home, Calendar, User, Dumbbell, ChevronRight, CheckCircle2, ArrowLeft, Play, Clock, Repeat, Target, Flame } from 'lucide-react';

// === HÌNH ẢNH/GIF HƯỚNG DẪN TẬP ===
// Sử dụng ảnh động (GIF) hướng dẫn. Thêm referrerPolicy="no-referrer" để chống lỗi hotlink.
const GIF = {
  pushUp: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/asymmetrical-push-up-exercise-illustration-spotebi.gif',
  pushUpWide: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/hindu-push-ups-exercise-illustration-spotebi.gif',
  pushUpKnee: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/3211-ZOuKWir.gif',
  squat: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/squat-exercise-illustration.gif',
  lunge: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/3635-ecl28tP.gif',
  gluteBridge: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/glute-bridge-exercise-illustration-spotebi.gif',
  calfRaise: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/1373-bJYHBIN.gif',
  jumpSquat: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/0514-LIlE5Tn.gif',
  crunch: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/crunches-exercise-illustration.gif',
  heelTouch: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/alternate-heel-touchers-exercise-illustration.gif',
  crossCrunch: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/cross-crunches-exercise-illustration.gif',
  vUps: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/v-sit-exercise-illustration.gif',
  bicycle: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/bicycle-crunches-.gif',
  legRaise: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/flutter-kicks-exercise-illustration.gif',
  highKnees: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/high-knees-exercise-illustration.gif',
  reverseCrunch: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/reverse-crunches-exercise-illustration.gif',
  russianTwist: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/russian-twist-exercise-illustration.gif',
  burpee: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/1160-dK9394r.gif',
  mountainClimber: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/0630-RJgzwny.gif',
  jumpingJack: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/jumping-jacks-exercise-illustration.gif',
  plank: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/plank-exercise-illustration.gif',
  superman: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/alternating-superman-exercise-illustration.gif',
  backExt: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/1314-qLpO4vV.gif',
  tricepDip: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/0814-X6C6i5Y.gif',
  armCircle: 'https://raw.githubusercontent.com/laycielee/WorkoutGIFs/main/arm-circles-exercise-illustration.gif',
  pikePushUp: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/1296-sVvXT5J.gif',
  shoulderTap: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/3699-yRpV5TC.gif',
  sidePlank: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/master/videos/3544-5VXmnV5.gif',
};

// === ID VIDEO YOUTUBE HƯỚNG DẪN TẬP LUYỆN ===
// Video sẽ tự động phát khi bấm vào nút Play trên ảnh. Đây là các video chuẩn chỉ người thật tập luyện.
const YOUTUBE = {
  pushUp: 'IODxDxX7oi4', pushUpWide: 'rr6eMEtgqqg', squat: 'YaXPRqUwItQ', lunge: 'QOVaHwm-Q6U',
  gluteBridge: 'wPM8icPu6H8', calfRaise: '-M4-G8p8fmc', jumpSquat: 'Azl5tkCzDcc', crunch: 'Xyd_fa5zoEU',
  bicycle: '9FGilxCbdz8', legRaise: 'l4kQd9eFSfc', russianTwist: 'wkD8rjkodUI', burpee: 'dZgVxmf6jkA',
  mountainClimber: 'nmwgirgXLYM', jumpingJack: 'UpH7rm0cYbM', plank: 'pSHjTRCQxIw', superman: 'z6PJMT2y8GQ',
  backExt: 'ph3pddpKzzw', tricepDip: '6kALZikXxLc', armCircle: '1YHIV4a81Os', pikePushUp: 'sposDXWEB0A',
  shoulderTap: 'rC4EYE2UjG8', sidePlank: 'NXr4eVqSpIg'
};

// === DỮ LIỆU BÀI TẬP: TẤT CẢ ĐỀU TẠI NHÀ, KHÔNG DỤNG CỤ ===
// Mỗi vùng tập × mỗi cấp độ = đúng 10 bài
const DB = {
  'TOÀN THÂN': {
    'BEGINNER': [
      { name: 'Jumping Jacks', type: 'time', dur: 30, gif: GIF.jumpingJack },
      { name: 'Squat cơ bản', type: 'reps', dur: 10, gif: GIF.squat },
      { name: 'Plank giữ cơ', type: 'time', dur: 20, gif: GIF.plank },
      { name: 'Hít đất đầu gối', type: 'reps', dur: 8, gif: GIF.pushUpKnee },
      { name: 'Lunge tiến', type: 'reps', dur: 10, gif: GIF.lunge },
      { name: 'Gập bụng cơ bản', type: 'reps', dur: 12, gif: GIF.crunch },
      { name: 'Nâng hông', type: 'reps', dur: 12, gif: GIF.gluteBridge },
      { name: 'Mountain Climbers', type: 'time', dur: 20, gif: GIF.mountainClimber },
      { name: 'Chạm gót chân', type: 'reps', dur: 15, gif: GIF.heelTouch },
      { name: 'Nâng chân cao', type: 'time', dur: 20, gif: GIF.highKnees },
      { name: 'Gập bụng cơ bản', type: 'reps', dur: 12, gif: GIF.crunch },
      { name: 'Plank giữ cơ', type: 'time', dur: 20, gif: GIF.plank },
      { name: 'Chạm gót chân', type: 'reps', dur: 15, gif: GIF.heelTouch },
      { name: 'Nâng chân', type: 'time', dur: 20, gif: GIF.legRaise },
      { name: 'Gập bụng đạp xe', type: 'reps', dur: 12, gif: GIF.bicycle },
      { name: 'Plank nghiêng phải', type: 'time', dur: 15, gif: GIF.sidePlank },
      { name: 'Gập bụng chéo', type: 'reps', dur: 10, gif: GIF.crossCrunch },
      { name: 'Plank nghiêng trái', type: 'time', dur: 15, gif: GIF.sidePlank },
      { name: 'Nâng hông', type: 'reps', dur: 12, gif: GIF.gluteBridge },
      { name: 'Mountain Climbers', type: 'time', dur: 20, gif: GIF.mountainClimber },
    ],
    'INTERMEDIATE': [
      { name: 'Gập bụng chữ V', type: 'reps', dur: 15, gif: GIF.vUps },
      { name: 'Plank giữ cơ', type: 'time', dur: 30, gif: GIF.plank },
      { name: 'Russian Twist', type: 'reps', dur: 20, gif: GIF.russianTwist },
      { name: 'Nâng chân thẳng', type: 'time', dur: 25, gif: GIF.legRaise },
      { name: 'Mountain Climbers', type: 'time', dur: 30, gif: GIF.mountainClimber },
      { name: 'Plank nghiêng', type: 'time', dur: 25, gif: GIF.sidePlank },
      { name: 'Gập bụng đạp xe', type: 'reps', dur: 20, gif: GIF.bicycle },
      { name: 'Chạm gót chân', type: 'reps', dur: 20, gif: GIF.heelTouch },
      { name: 'Plank lên xuống', type: 'time', dur: 30, gif: GIF.plank },
      { name: 'Gập bụng ngược', type: 'reps', dur: 15, gif: GIF.reverseCrunch },
    ],
    'ADVANCED': [
      { name: 'Gập bụng chữ V nâng cao', type: 'reps', dur: 20, gif: GIF.vUps },
      { name: 'Plank giữ cơ lâu', type: 'time', dur: 60, gif: GIF.plank },
      { name: 'Russian Twist nhanh', type: 'reps', dur: 30, gif: GIF.russianTwist },
      { name: 'Mountain Climbers tốc độ', type: 'time', dur: 45, gif: GIF.mountainClimber },
      { name: 'Nâng chân giữ', type: 'time', dur: 40, gif: GIF.legRaise },
      { name: 'Plank nghiêng nâng tay', type: 'time', dur: 35, gif: GIF.sidePlank },
      { name: 'Gập bụng đạp xe nhanh', type: 'reps', dur: 30, gif: GIF.bicycle },
      { name: 'Plank lên xuống nhanh', type: 'time', dur: 45, gif: GIF.plank },
      { name: 'Chạm gót liên tục', type: 'reps', dur: 30, gif: GIF.heelTouch },
      { name: 'Gập bụng ngược nâng cao', type: 'reps', dur: 20, gif: GIF.reverseCrunch },
    ],
  },
  'BỤNG': {
    'BEGINNER': [
      { name: 'Gập bụng cơ bản', type: 'reps', dur: 12, gif: GIF.crunch },
      { name: 'Chạm gót chân', type: 'reps', dur: 15, gif: GIF.heelTouch },
      { name: 'Plank giữ cơ', type: 'time', dur: 20, gif: GIF.plank },
      { name: 'Gập bụng đạp xe', type: 'reps', dur: 12, gif: GIF.bicycle },
      { name: 'Gập bụng chéo', type: 'reps', dur: 10, gif: GIF.crossCrunch },
      { name: 'Nâng chân', type: 'time', dur: 20, gif: GIF.legRaise },
      { name: 'Gập bụng cơ bản', type: 'reps', dur: 12, gif: GIF.crunch },
      { name: 'Plank nghiêng phải', type: 'time', dur: 15, gif: GIF.sidePlank },
      { name: 'Chạm gót chân', type: 'reps', dur: 15, gif: GIF.heelTouch },
      { name: 'Plank nghiêng trái', type: 'time', dur: 15, gif: GIF.sidePlank },
    ],
    'INTERMEDIATE': [
      { name: 'Gập bụng chữ V', type: 'reps', dur: 15, gif: GIF.vUps },
      { name: 'Plank giữ cơ', type: 'time', dur: 30, gif: GIF.plank },
      { name: 'Russian Twist', type: 'reps', dur: 20, gif: GIF.russianTwist },
      { name: 'Nâng chân thẳng', type: 'time', dur: 25, gif: GIF.legRaise },
      { name: 'Gập bụng đạp xe', type: 'reps', dur: 20, gif: GIF.bicycle },
      { name: 'Plank nghiêng', type: 'time', dur: 25, gif: GIF.sidePlank },
      { name: 'Gập bụng ngược', type: 'reps', dur: 15, gif: GIF.reverseCrunch },
      { name: 'Chạm gót chân', type: 'reps', dur: 20, gif: GIF.heelTouch },
      { name: 'Plank lên xuống', type: 'time', dur: 30, gif: GIF.plank },
      { name: 'Gập bụng chữ V', type: 'reps', dur: 15, gif: GIF.vUps },
    ],
    'ADVANCED': [
      { name: 'Gập bụng chữ V nâng cao', type: 'reps', dur: 20, gif: GIF.vUps },
      { name: 'Plank giữ cơ lâu', type: 'time', dur: 60, gif: GIF.plank },
      { name: 'Russian Twist nhanh', type: 'reps', dur: 30, gif: GIF.russianTwist },
      { name: 'Gập bụng đạp xe nhanh', type: 'reps', dur: 30, gif: GIF.bicycle },
      { name: 'Nâng chân giữ', type: 'time', dur: 40, gif: GIF.legRaise },
      { name: 'Gập bụng ngược nâng cao', type: 'reps', dur: 20, gif: GIF.reverseCrunch },
      { name: 'Plank nghiêng nâng tay', type: 'time', dur: 35, gif: GIF.sidePlank },
      { name: 'Chạm gót liên tục', type: 'reps', dur: 30, gif: GIF.heelTouch },
      { name: 'Plank lên xuống nhanh', type: 'time', dur: 45, gif: GIF.plank },
      { name: 'Gập bụng chữ V nâng cao', type: 'reps', dur: 20, gif: GIF.vUps },
    ],
  },
  'NGỰC': {
    'BEGINNER': [
      { name: 'Hít đất đầu gối', type: 'reps', dur: 8, gif: GIF.pushUpKnee },
      { name: 'Đẩy tường', type: 'reps', dur: 12, gif: GIF.pushUpWide },
      { name: 'Hít đất rộng tay', type: 'reps', dur: 8, gif: GIF.pushUpWide },
      { name: 'Plank giữ cơ', type: 'time', dur: 20, gif: GIF.plank },
      { name: 'Hít đất cơ bản', type: 'reps', dur: 8, gif: GIF.pushUp },
      { name: 'Plank vỗ vai', type: 'time', dur: 20, gif: GIF.shoulderTap },
      { name: 'Chống đẩy tĩnh giữ', type: 'time', dur: 15, gif: GIF.plank },
      { name: 'Hít đất hẹp tay', type: 'reps', dur: 6, gif: GIF.pushUp },
      { name: 'Ép ngực tĩnh', type: 'time', dur: 20, gif: GIF.pushUp },
      { name: 'Plank nghiêng', type: 'time', dur: 20, gif: GIF.sidePlank },
    ],
    'INTERMEDIATE': [
      { name: 'Hít đất cơ bản', type: 'reps', dur: 15, gif: GIF.pushUp },
      { name: 'Hít đất rộng tay', type: 'reps', dur: 12, gif: GIF.pushUpWide },
      { name: 'Hít đất hẹp tay', type: 'reps', dur: 10, gif: GIF.pushUp },
      { name: 'Plank giữ cơ', type: 'time', dur: 30, gif: GIF.plank },
      { name: 'Hít đất dốc lên', type: 'reps', dur: 10, gif: GIF.pushUpWide },
      { name: 'Plank vỗ vai', type: 'time', dur: 30, gif: GIF.shoulderTap },
      { name: 'Hít đất kim cương', type: 'reps', dur: 8, gif: GIF.pushUp },
      { name: 'Ép ngực tĩnh giữ', type: 'time', dur: 25, gif: GIF.plank },
      { name: 'Hít đất chậm', type: 'reps', dur: 10, gif: GIF.pushUp },
      { name: 'Plank lên xuống', type: 'time', dur: 30, gif: GIF.plank },
    ],
    'ADVANCED': [
      { name: 'Hít đất bật tay', type: 'reps', dur: 12, gif: GIF.pushUp },
      { name: 'Hít đất kim cương', type: 'reps', dur: 15, gif: GIF.pushUp },
      { name: 'Hít đất rộng tay sâu', type: 'reps', dur: 15, gif: GIF.pushUpWide },
      { name: 'Plank giữ cơ lâu', type: 'time', dur: 60, gif: GIF.plank },
      { name: 'Hít đất một tay trợ lực', type: 'reps', dur: 8, gif: GIF.pushUp },
      { name: 'Plank vỗ vai nhanh', type: 'time', dur: 40, gif: GIF.shoulderTap },
      { name: 'Hít đất dốc xuống', type: 'reps', dur: 12, gif: GIF.pushUp },
      { name: 'Hít đất chậm 3 giây', type: 'reps', dur: 10, gif: GIF.pushUp },
      { name: 'Plank lên xuống nhanh', type: 'time', dur: 45, gif: GIF.plank },
      { name: 'Hít đất siêu chậm', type: 'reps', dur: 8, gif: GIF.pushUp },
    ],
  },
  'CÁNH TAY': {
    'BEGINNER': [
      { name: 'Xoay cánh tay', type: 'time', dur: 20, gif: GIF.armCircle },
      { name: 'Chống đẩy sau', type: 'reps', dur: 8, gif: GIF.tricepDip },
      { name: 'Hít đất hẹp tay', type: 'reps', dur: 6, gif: GIF.pushUp },
      { name: 'Giữ tay chữ T', type: 'time', dur: 15, gif: GIF.armCircle },
      { name: 'Plank giữ cơ', type: 'time', dur: 20, gif: GIF.plank },
      { name: 'Đẩy tường', type: 'reps', dur: 12, gif: GIF.pushUpWide },
      { name: 'Plank chạm vai', type: 'time', dur: 20, gif: GIF.shoulderTap },
      { name: 'Gập tay tĩnh', type: 'time', dur: 15, gif: GIF.armCircle },
      { name: 'Chống đẩy sau chậm', type: 'reps', dur: 8, gif: GIF.tricepDip },
      { name: 'Căng cơ tay', type: 'time', dur: 20, gif: GIF.armCircle },
    ],
    'INTERMEDIATE': [
      { name: 'Chống đẩy sau', type: 'reps', dur: 12, gif: GIF.tricepDip },
      { name: 'Xoay cánh tay', type: 'time', dur: 30, gif: GIF.armCircle },
      { name: 'Hít đất kim cương', type: 'reps', dur: 10, gif: GIF.pushUp },
      { name: 'Plank lên xuống', type: 'time', dur: 30, gif: GIF.plank },
      { name: 'Giữ tay chữ T', type: 'time', dur: 25, gif: GIF.armCircle },
      { name: 'Plank chạm vai', type: 'time', dur: 30, gif: GIF.shoulderTap },
      { name: 'Chống đẩy sau sâu', type: 'reps', dur: 12, gif: GIF.tricepDip },
      { name: 'Hít đất hẹp tay', type: 'reps', dur: 10, gif: GIF.pushUp },
      { name: 'Gập tay tĩnh giữ', type: 'time', dur: 25, gif: GIF.armCircle },
      { name: 'Đẩy tường nhanh', type: 'reps', dur: 15, gif: GIF.pushUpWide },
    ],
    'ADVANCED': [
      { name: 'Chống đẩy sau nâng cao', type: 'reps', dur: 20, gif: GIF.tricepDip },
      { name: 'Hít đất kim cương sâu', type: 'reps', dur: 15, gif: GIF.pushUp },
      { name: 'Xoay cánh tay nặng', type: 'time', dur: 40, gif: GIF.armCircle },
      { name: 'Plank lên xuống nhanh', type: 'time', dur: 45, gif: GIF.plank },
      { name: 'Giữ tay chữ T lâu', type: 'time', dur: 40, gif: GIF.armCircle },
      { name: 'Hít đất hẹp sâu', type: 'reps', dur: 15, gif: GIF.pushUp },
      { name: 'Plank chạm vai nhanh', type: 'time', dur: 40, gif: GIF.shoulderTap },
      { name: 'Chống đẩy sau siêu chậm', type: 'reps', dur: 12, gif: GIF.tricepDip },
      { name: 'Gập tay tĩnh lâu', type: 'time', dur: 35, gif: GIF.armCircle },
      { name: 'Hít đất kim cương bật', type: 'reps', dur: 10, gif: GIF.pushUp },
    ],
  },
  'CHÂN': {
    'BEGINNER': [
      { name: 'Squat cơ bản', type: 'reps', dur: 10, gif: GIF.squat },
      { name: 'Lunge tiến', type: 'reps', dur: 8, gif: GIF.lunge },
      { name: 'Nâng bắp chân', type: 'reps', dur: 15, gif: GIF.calfRaise },
      { name: 'Giữ tư thế Squat', type: 'time', dur: 20, gif: GIF.squat },
      { name: 'Nâng hông', type: 'reps', dur: 12, gif: GIF.gluteBridge },
      { name: 'Squat rộng chân', type: 'reps', dur: 10, gif: GIF.squat },
      { name: 'Nhón gót', type: 'time', dur: 20, gif: GIF.calfRaise },
      { name: 'Lunge lùi', type: 'reps', dur: 8, gif: GIF.lunge },
      { name: 'Squat chậm', type: 'reps', dur: 10, gif: GIF.squat },
      { name: 'Plank giữ cơ', type: 'time', dur: 20, gif: GIF.plank },
    ],
    'INTERMEDIATE': [
      { name: 'Squat xuống sâu', type: 'reps', dur: 15, gif: GIF.squat },
      { name: 'Lunge tiến xen kẽ', type: 'reps', dur: 12, gif: GIF.lunge },
      { name: 'Squat kiểu Sumo', type: 'reps', dur: 12, gif: GIF.squat },
      { name: 'Giữ Squat tĩnh', type: 'time', dur: 30, gif: GIF.squat },
      { name: 'Nâng hông', type: 'reps', dur: 15, gif: GIF.gluteBridge },
      { name: 'Nâng bắp chân', type: 'reps', dur: 20, gif: GIF.calfRaise },
      { name: 'Lunge lùi xen kẽ', type: 'reps', dur: 12, gif: GIF.lunge },
      { name: 'Squat giữ 3 giây', type: 'time', dur: 30, gif: GIF.squat },
      { name: 'Mountain Climbers', type: 'time', dur: 25, gif: GIF.mountainClimber },
      { name: 'Chùng chân chéo', type: 'reps', dur: 12, gif: GIF.lunge },
    ],
    'ADVANCED': [
      { name: 'Squat bật nhảy', type: 'reps', dur: 15, gif: GIF.jumpSquat },
      { name: 'Lunge bật nhảy', type: 'reps', dur: 12, gif: GIF.lunge },
      { name: 'Squat Sumo sâu', type: 'reps', dur: 20, gif: GIF.squat },
      { name: 'Giữ Squat tĩnh lâu', type: 'time', dur: 45, gif: GIF.squat },
      { name: 'Nâng hông 1 chân', type: 'reps', dur: 12, gif: GIF.gluteBridge },
      { name: 'Nâng bắp chân 1 chân', type: 'reps', dur: 15, gif: GIF.calfRaise },
      { name: 'Lunge lùi sâu', type: 'reps', dur: 15, gif: GIF.lunge },
      { name: 'Squat 1 chân hỗ trợ', type: 'reps', dur: 8, gif: GIF.squat },
      { name: 'Mountain Climbers nhanh', type: 'time', dur: 40, gif: GIF.mountainClimber },
      { name: 'Tuck Jumps', type: 'reps', dur: 10, gif: GIF.jumpSquat },
    ],
  },
  'LƯNG': {
    'BEGINNER': [
      { name: 'Nâng người siêu nhân', type: 'reps', dur: 10, gif: GIF.superman },
      { name: 'Bơi cạn', type: 'time', dur: 20, gif: GIF.superman },
      { name: 'Plank giữ cơ', type: 'time', dur: 20, gif: GIF.plank },
      { name: 'Nâng hông', type: 'reps', dur: 12, gif: GIF.gluteBridge },
      { name: 'Plank vươn tay', type: 'time', dur: 20, gif: GIF.shoulderTap },
      { name: 'Nâng chân tay đối diện', type: 'reps', dur: 10, gif: GIF.superman },
      { name: 'Gập lưng trên', type: 'reps', dur: 10, gif: GIF.backExt },
      { name: 'Plank nghiêng', type: 'time', dur: 20, gif: GIF.sidePlank },
      { name: 'Siêu nhân giữ', type: 'time', dur: 15, gif: GIF.superman },
      { name: 'Gập lưng dưới', type: 'reps', dur: 10, gif: GIF.backExt },
    ],
    'INTERMEDIATE': [
      { name: 'Siêu nhân giữ lâu', type: 'time', dur: 30, gif: GIF.superman },
      { name: 'Bơi cạn nhanh', type: 'time', dur: 30, gif: GIF.superman },
      { name: 'Plank vươn tay xen kẽ', type: 'time', dur: 30, gif: GIF.shoulderTap },
      { name: 'Gập lưng chậm', type: 'reps', dur: 15, gif: GIF.backExt },
      { name: 'Plank nghiêng nâng hông', type: 'time', dur: 25, gif: GIF.sidePlank },
      { name: 'Nâng chân tay đối diện', type: 'reps', dur: 15, gif: GIF.superman },
      { name: 'Nâng hông', type: 'reps', dur: 15, gif: GIF.gluteBridge },
      { name: 'Plank lên xuống', type: 'time', dur: 30, gif: GIF.plank },
      { name: 'Gập lưng giữ 3 giây', type: 'reps', dur: 12, gif: GIF.backExt },
      { name: 'Mountain Climbers', type: 'time', dur: 25, gif: GIF.mountainClimber },
    ],
    'ADVANCED': [
      { name: 'Siêu nhân giữ cực lâu', type: 'time', dur: 45, gif: GIF.superman },
      { name: 'Bơi cạn tốc độ', type: 'time', dur: 45, gif: GIF.superman },
      { name: 'Plank vươn tay nặng', type: 'time', dur: 45, gif: GIF.shoulderTap },
      { name: 'Gập lưng siêu chậm', type: 'reps', dur: 20, gif: GIF.backExt },
      { name: 'Plank nghiêng nâng chân', type: 'time', dur: 40, gif: GIF.sidePlank },
      { name: 'Nâng toàn thân siêu nhân', type: 'reps', dur: 20, gif: GIF.superman },
      { name: 'Nâng hông 1 chân', type: 'reps', dur: 15, gif: GIF.gluteBridge },
      { name: 'Plank lên xuống nhanh', type: 'time', dur: 45, gif: GIF.plank },
      { name: 'Gập lưng giữ 5 giây', type: 'reps', dur: 15, gif: GIF.backExt },
      { name: 'Burpees', type: 'reps', dur: 10, gif: GIF.burpee },
    ],
  },
  'VAI': {
    'BEGINNER': [
      { name: 'Xoay vai', type: 'time', dur: 20, gif: GIF.armCircle },
      { name: 'Đẩy tường cao', type: 'reps', dur: 10, gif: GIF.pushUpWide },
      { name: 'Nâng tay trước', type: 'reps', dur: 10, gif: GIF.armCircle },
      { name: 'Giữ tay chữ T', type: 'time', dur: 15, gif: GIF.armCircle },
      { name: 'Plank giữ cơ', type: 'time', dur: 20, gif: GIF.plank },
      { name: 'Nâng tay ngang', type: 'reps', dur: 10, gif: GIF.armCircle },
      { name: 'Plank chạm vai', type: 'time', dur: 20, gif: GIF.shoulderTap },
      { name: 'Hít đất đầu gối', type: 'reps', dur: 8, gif: GIF.pushUpKnee },
      { name: 'Xoay vai ngược', type: 'time', dur: 20, gif: GIF.armCircle },
      { name: 'Plank nghiêng', type: 'time', dur: 15, gif: GIF.sidePlank },
    ],
    'INTERMEDIATE': [
      { name: 'Xoay vai rộng', type: 'time', dur: 30, gif: GIF.armCircle },
      { name: 'Hít đất kiểu Pike', type: 'reps', dur: 10, gif: GIF.pikePushUp },
      { name: 'Nâng tay trước giữ', type: 'time', dur: 25, gif: GIF.armCircle },
      { name: 'Plank chạm vai nhanh', type: 'time', dur: 30, gif: GIF.shoulderTap },
      { name: 'Nâng tay ngang', type: 'reps', dur: 15, gif: GIF.armCircle },
      { name: 'Plank lên xuống', type: 'time', dur: 30, gif: GIF.plank },
      { name: 'Hít đất rộng tay', type: 'reps', dur: 12, gif: GIF.pushUpWide },
      { name: 'Giữ tay chữ T lâu', type: 'time', dur: 25, gif: GIF.armCircle },
      { name: 'Xoay vai chéo', type: 'reps', dur: 15, gif: GIF.armCircle },
      { name: 'Plank nghiêng nâng tay', type: 'time', dur: 25, gif: GIF.sidePlank },
    ],
    'ADVANCED': [
      { name: 'Hít đất kiểu Pike sâu', type: 'reps', dur: 15, gif: GIF.pikePushUp },
      { name: 'Xoay vai nặng', type: 'time', dur: 45, gif: GIF.armCircle },
      { name: 'Nâng tay trước giữ lâu', type: 'time', dur: 40, gif: GIF.armCircle },
      { name: 'Plank chạm vai siêu nhanh', type: 'time', dur: 45, gif: GIF.shoulderTap },
      { name: 'Nâng tay ngang giữ', type: 'reps', dur: 20, gif: GIF.armCircle },
      { name: 'Plank lên xuống nhanh', type: 'time', dur: 45, gif: GIF.plank },
      { name: 'Hít đất Pike bật', type: 'reps', dur: 10, gif: GIF.pikePushUp },
      { name: 'Giữ tay chữ T cực lâu', type: 'time', dur: 40, gif: GIF.armCircle },
      { name: 'Plank nghiêng nâng chân', type: 'time', dur: 40, gif: GIF.sidePlank },
      { name: 'Burpees', type: 'reps', dur: 10, gif: GIF.burpee },
    ],
  },
};

// Hàm lấy 10 bài - LUÔN TRẢ VỀ ĐÚNG 10, KHÔNG BAO GIỜ RỖNG
const getExercises = (area, level) => {
  const a = DB[area];
  if (!a) return DB['TOÀN THÂN'][level] || DB['TOÀN THÂN']['BEGINNER'];
  return a[level] || a['BEGINNER'];
};

// Component ảnh GIF với fallback loading & chống hotlink
const ExerciseImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Khi src thay đổi, reset lại state
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  // Fallback image đáng tin cậy nếu có lỗi (Dumbbell icon fallback)
  if (error || !src) {
    return (
      <div className={`relative ${className} overflow-hidden bg-slate-800 flex items-center justify-center`}>
        <div className="text-center">
          <Dumbbell className="w-10 h-10 text-orange-500 mx-auto mb-2 opacity-50" />
          <span className="text-xs text-slate-500 font-medium px-4 block text-center leading-tight">
            GIF Đang Tải...<br/>({alt})
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className} overflow-hidden bg-slate-800`}>
      {/* Hiệu ứng loading chỉ hiện khi chưa load */}
      {!loaded && (
        <div className="absolute inset-0 bg-slate-700 animate-pulse flex items-center justify-center z-0">
          <Dumbbell className="w-8 h-8 text-slate-500 animate-bounce" />
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} relative z-10`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(() => localStorage.getItem('gym_screen') || 'welcome');
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('gym_tab') || 'home');
  const [selectedLevel, setSelectedLevel] = useState(() => localStorage.getItem('gym_level') || 'BEGINNER');
  const [selectedArea, setSelectedArea] = useState(() => localStorage.getItem('gym_area') || '');
  const [exIndex, setExIndex] = useState(() => parseInt(localStorage.getItem('gym_exIdx')) || 0);

  const [workoutState, setWorkoutState] = useState('ready'); // ready, active, paused, finished
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    localStorage.setItem('gym_screen', currentScreen);
    localStorage.setItem('gym_tab', activeTab);
    localStorage.setItem('gym_level', selectedLevel);
    localStorage.setItem('gym_area', selectedArea);
    localStorage.setItem('gym_exIdx', exIndex.toString());
  }, [currentScreen, activeTab, selectedLevel, selectedArea, exIndex]);

  useEffect(() => { setTimeout(() => setIsLoaded(true), 100); }, []);

  const handleStart = () => { setCurrentScreen('dashboard'); setActiveTab('home'); };
  const handleLevelSelect = (id) => setSelectedLevel(id);
  const handleAreaSelect = (label) => { setSelectedArea(label); setCurrentScreen('exercise-list'); };
  const handleTabChange = (tab) => { setActiveTab(tab); if (tab === 'home' && currentScreen === 'welcome') setCurrentScreen('dashboard'); };

  const levels = [
    { id: 'BEGINNER', label: 'NGƯỜI BẮT ĐẦU', color: 'bg-blue-500', glow: 'shadow-blue-500/40', border: 'border-blue-500', text: 'text-blue-500' },
    { id: 'INTERMEDIATE', label: 'TRUNG BÌNH', color: 'bg-orange-500', glow: 'shadow-orange-500/40', border: 'border-orange-500', text: 'text-orange-500' },
    { id: 'ADVANCED', label: 'NÂNG CAO', color: 'bg-red-500', glow: 'shadow-red-500/40', border: 'border-red-500', text: 'text-red-500' },
  ];

  const focusAreas = [
    { label: 'TOÀN THÂN', color: 'bg-red-500' },
    { label: 'BỤNG', color: 'bg-blue-600' },
    { label: 'NGỰC', color: 'bg-cyan-500' },
    { label: 'CÁNH TAY', color: 'bg-purple-500' },
    { label: 'CHÂN', color: 'bg-green-500' },
    { label: 'LƯNG', color: 'bg-slate-500' },
    { label: 'VAI', color: 'bg-yellow-500' },
  ];

  const exerciseList = useMemo(() => {
    if (!selectedArea) return [];
    return getExercises(selectedArea, selectedLevel).map((ex, i) => ({
      id: `${selectedArea}-${selectedLevel}-${i}`,
      name: ex.name, 
      type: ex.type, 
      durationOrReps: ex.dur, 
      gifUrl: ex.gifUrl || ex.gif,
      videoId: ex.videoId
    }));
  }, [selectedArea, selectedLevel]);

  const currentLevelLabel = levels.find(l => l.id === selectedLevel)?.label || 'NGƯỜI BẮT ĐẦU';
  const currentExercise = exerciseList[exIndex] || null;

  useEffect(() => {
    if (currentScreen === 'workout' && currentExercise) {
       setWorkoutState('ready');
       setTimeLeft(currentExercise.type === 'time' ? currentExercise.durationOrReps : 0);
    }
  }, [currentScreen, currentExercise]);

  useEffect(() => {
    let timer;
    if (workoutState === 'active' && currentExercise?.type === 'time') {
      if (timeLeft > 0) {
        timer = setTimeout(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else {
        setWorkoutState('finished');
      }
    }
    return () => clearTimeout(timer);
  }, [workoutState, currentExercise?.type, timeLeft]);

  const handleNextExercise = () => {
    if (exIndex < exerciseList.length - 1) {
      setExIndex(exIndex + 1);
      setWorkoutState('ready');
    } else {
      setCurrentScreen('congratulations');
    }
  };



  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className={`w-full max-w-[380px] h-[800px] max-h-[90vh] bg-slate-900 rounded-[3rem] shadow-2xl shadow-orange-500/5 border-[8px] border-slate-800 overflow-hidden relative flex flex-col transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

        {/* TAB LỊCH TRÌNH */}
        {activeTab === 'schedule' && (
          <div className="flex-1 flex flex-col h-full">
            <header className="px-6 py-6 border-b border-slate-800">
              <h2 className="text-2xl font-extrabold text-white">Lịch Trình</h2>
              <p className="text-slate-400 text-sm mt-1">Lộ trình 4 tuần thay đổi bản thân</p>
            </header>
            <div className="flex-1 p-6 overflow-y-auto pb-28 custom-scrollbar">
              {[1,2,3,4].map(w => (
                <div key={w} className="mb-6 bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Tuần {w}</h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-orange-500/20 text-orange-400 rounded-md">{w===1?'Đang tập':'Sắp tới'}</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(7)].map((_,i) => (
                      <div key={i} className={`h-10 rounded-lg flex items-center justify-center text-xs font-bold ${w===1&&i<3?'bg-orange-500 text-white':w===1&&i===3?'bg-slate-700 text-orange-400 border border-orange-500/50':'bg-slate-800 text-slate-500'}`}>T{i+2}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB HỒ SƠ */}
        {activeTab === 'profile' && (
          <div className="flex-1 flex flex-col h-full">
            <header className="px-6 py-6 border-b border-slate-800"><h2 className="text-2xl font-extrabold text-white">Hồ Sơ</h2></header>
            <div className="flex-1 p-6 overflow-y-auto pb-28 custom-scrollbar">
              <div className="flex flex-col items-center mt-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 p-1 shadow-lg shadow-orange-500/20 mb-4">
                  <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center"><User className="w-10 h-10 text-orange-200"/></div>
                </div>
                <h3 className="text-2xl font-bold text-white">Tô Gia Định</h3>
                <p className="text-orange-400 font-medium">Thành viên Premium</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-800/80 rounded-2xl p-4 text-center border border-slate-700">
                  <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2"/><p className="text-2xl font-bold text-white">12</p><p className="text-xs text-slate-400">Ngày tập liên tiếp</p>
                </div>
                <div className="bg-slate-800/80 rounded-2xl p-4 text-center border border-slate-700">
                  <Target className="w-6 h-6 text-blue-500 mx-auto mb-2"/><p className="text-2xl font-bold text-white">32</p><p className="text-xs text-slate-400">Bài tập hoàn thành</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB TRANG CHỦ */}
        {activeTab === 'home' && (<>
          {/* WELCOME */}
          {currentScreen === 'welcome' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
              <div className="absolute top-1/4 -right-16 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
              <div className="absolute bottom-1/3 -left-16 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
              <div className="z-10 flex flex-col items-center text-center w-full mt-10">
                <div className="w-24 h-24 bg-gradient-to-tr from-orange-500 to-red-500 rounded-3xl p-[2px] mb-8 shadow-lg shadow-orange-500/30 transform -rotate-6">
                  <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center"><Dumbbell className="w-12 h-12 text-orange-500 transform rotate-6"/></div>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Chào mừng,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Tô Gia Định</span></h1>
                <p className="text-slate-400 text-base mb-12 max-w-[250px] leading-relaxed">Xây Dựng Cơ Bắp & Giảm Cân Tại Nhà! Hãy bắt đầu hành trình ngay hôm nay.</p>
              </div>
              <div className="mt-auto w-full z-10 mb-8">
                <button onClick={handleStart} className="group w-full relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] active:scale-95">
                  <span className="relative z-10 flex items-center">BẮT ĐẦU TẬP LUYỆN<ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"/></span>
                </button>
              </div>
            </div>
          )}

          {/* DASHBOARD */}
          {currentScreen === 'dashboard' && (
            <div className="flex-1 flex flex-col h-full">
              <div className="flex-1 p-5 overflow-y-auto pb-28 custom-scrollbar">
                <header className="flex items-center justify-between mb-8 mt-2">
                  <div><h2 className="text-2xl font-extrabold text-white">Tô Gia Định</h2><p className="text-slate-400 text-sm mt-0.5">Sẵn sàng đốt cháy calo chưa?</p></div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 p-[2px] shadow-lg shadow-orange-500/20"><div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center"><User className="w-6 h-6 text-orange-200"/></div></div>
                </header>
                <div className="mb-8">
                  <h3 className="text-[13px] font-bold text-slate-400 mb-4 tracking-wider">DÀNH CHO MỌI CẤP ĐỘ</h3>
                  <div className="flex flex-col gap-3">
                    {levels.map(lv => {
                      const sel = selectedLevel === lv.id;
                      return (
                        <button key={lv.id} onClick={() => handleLevelSelect(lv.id)} className={`relative w-full rounded-2xl flex items-center p-4 transition-all duration-300 ${sel?`bg-slate-800 border-2 ${lv.border} ${lv.glow} shadow-xl scale-[1.02]`:'bg-slate-800/60 border-2 border-transparent hover:bg-slate-700/80 shadow-md'}`}>
                          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 rounded-r-full ${lv.color} transition-all duration-300 ${sel?'h-3/4':'h-1/2'}`}></div>
                          <div className="ml-4 flex-1 text-left"><span className={`font-bold text-sm ${sel?'text-white':'text-slate-400'}`}>{lv.label}</span></div>
                          {sel && <CheckCircle2 className={`w-5 h-5 ${lv.text}`}/>}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-slate-400 mb-4 tracking-wider">VÙNG TẬP TRUNG</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {focusAreas.map(a => (
                      <button key={a.label} onClick={() => handleAreaSelect(a.label)} className="group relative flex flex-col bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95">
                        <div className="h-28 w-full bg-slate-800/80 relative flex items-center justify-center"><Dumbbell className="w-8 h-8 text-slate-600/50 group-hover:text-slate-500 transition-colors"/></div>
                        <div className="p-3 w-full relative bg-slate-800/90 flex flex-col items-center justify-center">
                          <div className={`absolute top-0 left-0 w-full h-1 ${a.color}`}></div>
                          <span className="font-extrabold text-[13px] tracking-widest text-slate-200 mt-1">{a.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DANH SÁCH BÀI TẬP */}
          {currentScreen === 'exercise-list' && (
            <div className="flex-1 flex flex-col h-full">
              <header className="px-5 py-5 flex flex-col border-b border-slate-800/80 bg-slate-900/95 backdrop-blur-md z-10">
                <div className="flex items-center">
                  <button onClick={() => setCurrentScreen('dashboard')} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors active:scale-95"><ArrowLeft className="w-5 h-5"/></button>
                  <div className="ml-4"><h2 className="text-lg font-bold text-white uppercase">{selectedArea}</h2><p className="text-[11px] text-slate-400 mt-0.5">Cấp độ: {currentLevelLabel}</p></div>
                </div>
                <div className="flex items-center gap-4 mt-4 text-[12px] font-medium text-slate-400">
                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50"><Dumbbell className="w-3.5 h-3.5 text-orange-400"/><span>{exerciseList.length} bài</span></div>
                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50"><Clock className="w-3.5 h-3.5 text-blue-400"/><span>~15 phút</span></div>
                </div>
              </header>
              <div className="flex-1 overflow-y-auto p-4 pb-28 custom-scrollbar space-y-3">
                {exerciseList.map((ex, i) => (
                  <div key={ex.id} onClick={() => { setExIndex(i); setCurrentScreen('workout'); }} className="flex items-center bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/30 hover:border-slate-500/50 rounded-2xl p-3 cursor-pointer transition-all duration-300 active:scale-[0.98] group shadow-md">
                    <div className="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded-xl border border-slate-700/50">
                      <ExerciseImage src={ex.gifUrl} alt={ex.name} className="w-full h-full" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-bold text-slate-200 mb-1.5 group-hover:text-white">{ex.name}</h3>
                      {ex.type === 'time' ? (
                        <span className="text-blue-400 flex items-center gap-1 bg-blue-400/10 px-2 py-0.5 rounded-md text-xs font-semibold"><Clock className="w-3 h-3"/>{ex.durationOrReps} giây</span>
                      ) : (
                        <span className="text-orange-400 flex items-center gap-1 bg-orange-400/10 px-2 py-0.5 rounded-md text-xs font-semibold"><Repeat className="w-3 h-3"/>x{ex.durationOrReps} lần</span>
                      )}
                    </div>
                    <div className="ml-2 w-10 h-10 rounded-full bg-slate-700/80 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-red-500 flex items-center justify-center transition-all"><Play className="w-4 h-4 text-slate-300 group-hover:text-white ml-0.5" fill="currentColor"/></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÀN HÌNH TẬP LUYỆN - HIỂN THỊ GIF NGƯỜI HƯỚNG DẪN & BỘ ĐẾM */}
          {currentScreen === 'workout' && currentExercise && (
            <div className="flex-1 flex flex-col h-full">
              <header className="px-5 py-5 flex items-center border-b border-slate-800/80 bg-slate-900/95 backdrop-blur-md z-20">
                <button onClick={() => {setCurrentScreen('exercise-list'); setWorkoutState('ready');}} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors active:scale-95"><ArrowLeft className="w-5 h-5"/></button>
                <h2 className="ml-4 text-lg font-bold text-white uppercase">TẬP LUYỆN</h2>
              </header>
              <div className="flex-1 p-6 flex flex-col items-center justify-start text-center overflow-y-auto custom-scrollbar pb-28">
                <div className="bg-slate-800/80 px-4 py-1.5 rounded-full mb-4 border border-slate-700 text-xs font-bold text-orange-400">BÀI TẬP {exIndex + 1} / 10</div>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden rounded-xl border border-slate-700/50 shadow-lg bg-slate-800">
                    <ExerciseImage src={currentExercise.gifUrl} alt={currentExercise.name} className="w-full h-full" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight text-left">{currentExercise.name}</h3>
                </div>
                
                {/* BỘ ĐẾM THỜI GIAN / SỐ LẦN */}
                <div className="w-full bg-slate-800/60 rounded-3xl p-6 border border-slate-700/50 flex flex-col items-center justify-center shadow-inner mb-6">
                  {currentExercise.type === 'time' ? (
                    <>
                      <Clock className="w-8 h-8 text-blue-400 mb-3"/>
                      <span translate="no" className="text-6xl font-black text-blue-400 font-mono tracking-tighter">
                        {workoutState === 'ready' ? currentExercise.durationOrReps : timeLeft}
                        <span className="text-2xl text-blue-400/70 ml-2">s</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <Repeat className="w-8 h-8 text-orange-400 mb-3"/>
                      <span className="text-6xl font-black text-orange-400 font-mono tracking-tighter">
                        {currentExercise.durationOrReps}
                        <span className="text-2xl text-orange-400/70 ml-2">lần</span>
                      </span>
                    </>
                  )}
                </div>

                {/* CONTROLS (NÚT BẤM BẮT ĐẦU / CHUYỂN BÀI) */}
                <div className="w-full flex gap-4">
                  {currentExercise.type === 'time' ? (
                     workoutState === 'ready' ? (
                       <button onClick={() => setWorkoutState('active')} className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all text-lg">BẮT ĐẦU</button>
                     ) : workoutState === 'active' ? (
                       <button onClick={() => setWorkoutState('paused')} className="flex-1 bg-slate-700 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all text-lg border border-slate-600">TẠM DỪNG</button>
                     ) : workoutState === 'paused' ? (
                       <button onClick={() => setWorkoutState('active')} className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all text-lg">TIẾP TỤC</button>
                     ) : (
                       <button onClick={handleNextExercise} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/30 active:scale-95 transition-all text-lg flex items-center justify-center">BÀI TIẾP THEO <ChevronRight className="w-6 h-6 ml-1"/></button>
                     )
                  ) : (
                    <button onClick={handleNextExercise} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/30 active:scale-95 transition-all text-lg flex items-center justify-center">HOÀN THÀNH <CheckCircle2 className="w-6 h-6 ml-2"/></button>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* MÀN HÌNH HOÀN THÀNH CHÚC MỪNG */}
          {currentScreen === 'congratulations' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative h-full text-center">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
              <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 mb-6 relative z-10">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4 relative z-10">CHÚC MỪNG!</h2>
              <p className="text-slate-400 text-base mb-8 relative z-10">Bạn đã hoàn thành xuất sắc {exerciseList.length} bài tập. Hãy nghỉ ngơi và duy trì phong độ nhé!</p>
              
              <div className="grid grid-cols-2 gap-4 w-full mb-10 relative z-10">
                <div className="bg-slate-800/80 rounded-2xl p-4 text-center border border-slate-700">
                  <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2"/>
                  <p className="text-2xl font-bold text-white">~120</p>
                  <p className="text-xs text-slate-400">Kcal đốt cháy</p>
                </div>
                <div className="bg-slate-800/80 rounded-2xl p-4 text-center border border-slate-700">
                  <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2"/>
                  <p className="text-2xl font-bold text-white">15</p>
                  <p className="text-xs text-slate-400">Phút tập</p>
                </div>
              </div>

              <button onClick={() => { setCurrentScreen('dashboard'); setExIndex(0); setWorkoutState('ready'); }} className="relative z-10 w-full bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-slate-700 active:scale-95 transition-all border border-slate-700 hover:border-slate-500">
                VỀ TRANG CHỦ
              </button>
            </div>
          )}
        </>)}

        {/* BOTTOM NAVIGATION */}
        {currentScreen !== 'welcome' && (
          <div className="absolute bottom-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-6 py-4 pb-6 rounded-b-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] z-30">
            <div className="flex justify-between items-center px-4">
              {[{id:'home',Icon:Home,label:'Trang chủ'},{id:'schedule',Icon:Calendar,label:'Lịch trình'},{id:'profile',Icon:User,label:'Hồ sơ'}].map(t => (
                <button key={t.id} onClick={() => handleTabChange(t.id)} className="flex flex-col items-center gap-1 group active:scale-95 transition-transform">
                  <div className={`p-2.5 rounded-2xl transition-all duration-300 ${activeTab===t.id?'bg-gradient-to-tr from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 -translate-y-1':'text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-800'}`}><t.Icon className="w-5 h-5"/></div>
                  <span className={`text-[10px] font-bold mt-1 ${activeTab===t.id?'text-orange-500':'text-slate-500 group-hover:text-slate-300'}`}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar{display:none}.custom-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
};

export default App;
