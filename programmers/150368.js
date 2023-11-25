// https://school.programmers.co.kr/learn/courses/30/lessons/150368
// 2023 KAKAO BLIND RECRUITMENT: 이모티콘 할인행사
// Lv. 2

function getRedundantPermutations(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const permutations = [];

  items.forEach((fixedItem) => {
    const subPermutations = getRedundantPermutations(items, count - 1);
    subPermutations.forEach((subPermutation) => {
      permutations.push([fixedItem, ...subPermutation]);
    });
  });

  return permutations;
}

function discount(price, rate) {
  return price - (price / 100) * rate;
}

function getEmoticonPurchaseResult(users, emoticons) {
  const result = { salePrice: 0, plusService: 0 };

  users.forEach(([wantedDiscount, priceLimit]) => {
    let purchasePrice = 0;

    for (const [emoticonDiscount, emoticonPrice] of emoticons) {
      if (wantedDiscount <= emoticonDiscount) {
        purchasePrice += discount(emoticonPrice, emoticonDiscount);
      }

      if (priceLimit <= purchasePrice) {
        result.plusService += 1;
        return;
      }
    }

    result.salePrice += purchasePrice;
  });

  return result;
}

function solution(users, emoticons) {
  const discounts = [10, 20, 30, 40];
  const discountPermutations = getRedundantPermutations(
    discounts,
    emoticons.length
  );
  const bestResult = { salePrice: 0, plusService: 0 };

  discountPermutations.forEach((emoticonDiscounts) => {
    const discountEmoticons = emoticons.map((emoticonPrice, i) => {
      return [emoticonDiscounts[i], emoticonPrice];
    });

    const { salePrice, plusService } = getEmoticonPurchaseResult(
      users,
      discountEmoticons
    );

    if (
      bestResult.plusService < plusService ||
      (bestResult.plusService === plusService &&
        bestResult.salePrice < salePrice)
    ) {
      bestResult.plusService = plusService;
      bestResult.salePrice = salePrice;
    }
  });

  return [bestResult.plusService, bestResult.salePrice];
}
