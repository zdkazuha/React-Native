import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

const Test = () => {
  const [question, setQuestion] = React.useState(-1);
  const [points, setPoints] = React.useState(0.0);

  const questions = [
    {
      id: 1,
      title: "Ти, як правило, завжди буваєш всім задоволений?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 2,
      title: "Тобі іноді заважають заснути різні думки?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 3,
      title:
        "Чи було коли-небудь так, що тобі довірили таємницю, а ти не зміг її зберегти?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 4,
      title:
        "Чи було коли-небудь так, що тобі стає сумно без особливої причини?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 5,
      title: "Чи любиш ти жартувати над ким-небудь?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 6,
      title: "Чи можеш ти сказати про себе, що ти взагалі весела людина?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 7,
      title: "Чи часто ти потребуєш допомоги інших хлопців?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 8,
      title: "Чи часто у тебе міняється настрій?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 9,
      title:
        "Якщо ти хочеш познайомитися, то ти завжди першим починаєш розмову?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 10,
      title:
        "Якщо ти опиняєшся в дурному становищі, то ти потім довго засмучуєшся?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 11,
      title: "Як часто ти відволікаєшся, коли робиш уроки?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 12,
      title: "Як ти думаєш, тебе вважають веселою людиною?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 13,
      title: "Чи траплялося тобі говорити про будь-кого погано?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 14,
      title:
        "Чи можеш ти сказати, що ти трохи більше образлива людина, ніж інші?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 15,
      title: "Чи можеш ти сказати про себе, що ти безтурботна людина?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 16,
      title: "Чи можеш ти веселитися, не стримуючи себе, в компанії інших?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 17,
      title:
        "Чи було так, що тебе попросили допомогти по господарству, а ти не зміг цього зробити?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 18,
      title: "Чи буває таке, що тобі іноді більше подобається бути одному?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 19,
      title: "Чи буває таке, що в компанії інших ти найчастіше мовчиш?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 20,
      title: "Чи буває, що ти так хвилюєшся, що не можеш всидіти на місці?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 21,
      title: "Чи буває, що у тебе без особливої причини паморочиться голова?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 22,
      title: "Чи бувало таке, щоб ти коли-небудь грубо розмовляв з батьками?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 23,
      title: "Чи буває так, що твоє серце починає сильно битися без причини?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 24,
      title: "Тобі подобалася б така робота, де все треба робити дуже швидко?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 25,
      title: "Тобі часом сняться страшні сни?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 26,
      title: "У тебе часом буває таке відчуття, що тобі все набридло?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 27,
      title: "Чи був хоча б раз випадок, коли тобі було дуже погано?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 28,
      title: "Чи буває так, що іноді тебе майже все дратує?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 29,
      title: "Тобі подобається перебувати в голосливій та веселій компанії?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 30,
      title: "Тобі подобається жартувати і розповідати веселі історії друзям?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 31,
      title: "Тобі завжди подобається грати з іншими?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 32,
      title: "Ти можеш без особливих зусиль розвеселити нудну компанію?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 33,
      title: "Ти любиш часто ходити в гості?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 34,
      title: "Ти любиш іноді похвалитися?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 35,
      title: "Ти коли-небудь порушував правила поведінки?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 36,
      title: "Ти коли-небудь говорив неправду?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 37,
      title: "Ти іноді відчуваєш себе втомленим без особливої причини?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 38,
      title: "Ти зазвичай швидко приймаєш рішення?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 39,
      title: "Ти завжди їж все, що тобі дають?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 40,
      title: "Ти завжди виконуєш те, що тобі кажуть?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 41,
      title: "Ти жартуєш іноді в групі, особливо якщо там немає вчителя?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 42,
      title: "Ти дуже засмучуєшся, коли тебе сварять за що-небудь?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 43,
      title: "Тебе взагалі легко образити або засмутити?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 44,
      title: "Коли тебе про щось просять, тобі завжди важко відмовляти?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 45,
      title: "Коли тебе про що-небудь запитують, ти швидко знаходиш відповідь?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 46,
      title: "Буваєш ти дуже сердитим, дратівливим?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 47,
      title: "Чи буває так, що тобі не хочеться брати участь у святкуванні?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 48,
      title: "Кажеш ти іноді перше, що спадає на думку?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 49,
      title: "Буває, що ти відчуваєш себе самотнім?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 50,
      title: "Коли хто-небудь кричить на тебе, ти теж кричиш у відповідь?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 51,
      title: "На тебе впливає погода?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 52,
      title: "Ти зазвичай соромишся заговорити першим з незнайомими?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 53,
      title: "Ти майже завжди впевнений, що впораєшся зі справою?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 54,
      title: "Ти часто спохвачуєшся, коли вже пізно?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
    {
      id: 55,
      title: "Тобі іноді здається, що важко отримати задоволення від компанії?",
      opt1: "інколи",
      opt2: "так",
      opt3: "ні",
    },
  ];

  const showQuestion = () => {
    const q = questions[question];

    Alert.alert("Запитання " + q.id, q.title, [
      {
        text: q.opt1,
        onPress: () => finishQuestion(0.5),
      },
      {
        text: q.opt2,
        onPress: () => finishQuestion(1),
      },
      {
        text: q.opt3,
        onPress: () => finishQuestion(0),
      },
    ]);
  };

  const finishQuestion = (Points: number) => {
    setPoints((prev) => prev + Points);
    setQuestion((prev) => prev + 1);
  };

  const getResult = (Points: number) => {
  if (Points >= 0 && Points <= 12) {
    return "Ви — Інтроверт: занурені в себе, спокійні, любите самотність.";
  }
  if (Points >= 13 && Points <= 24) {
    return "Ви — Флегматик: врівноважена людина, обернена до зовнішнього світу.";
  }
  if (Points >= 25 && Points <= 40) {
    return "Ви — Сангвінік/Холерик: активна, товариська людина, яка легко йде на контакт.";
  }
  if (Points >= 41 && Points <= 55) {
    return "Ви — Екстраверт (Меланхолік): дуже емоційна людина, залежна від оточення.";
  }
  return "Тест завершено. Дякуємо!";
  };

  const resetTest = () => {
    setPoints(0);
    setQuestion(-1);
  };

  React.useEffect(() => {
    if (question >= 0 && question < questions.length) {
      showQuestion();
    }
  }, [question]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {question === -1 && (
          <View style={styles.box}>
            <Text style={styles.title}>Готовий до тесту?</Text>
            <Button title="Почати тест" onPress={() => setQuestion(0)} />
          </View>
        )}

        {question >= questions.length && (
          <View style={styles.box}>
            <Text style={styles.title}>Тест завершено! 🎉</Text>
            <Text style={styles.resultPoints}>Результат: {points} балів</Text>
            <Text style={styles.resultDescription}>{getResult(points)}</Text>
            <View style={{ marginTop: 20 }}>
              <Button title="Спробувати ще раз" onPress={resetTest} />
            </View>
          </View>
        )}

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  box: {
    width: '100%',
    alignItems: "center",
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  subText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 20,
  },
  resultPoints: {
    fontSize: 22,
    fontWeight: '600',
    color: "green",
    marginBottom: 10,
  },
  resultDescription: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    lineHeight: 24,
  }
});

export default Test;