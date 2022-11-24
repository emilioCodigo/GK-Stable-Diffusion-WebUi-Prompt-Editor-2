import { iPromptStore } from "./../../shared/model/prompt.model";
import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { iPrompt } from "src/app/shared/model/prompt.model";

@Injectable({
	providedIn: "root",
})
export class EditorV1StatusService {
	private list$ = new BehaviorSubject<iPrompt[]>([]);
	constructor() {}
	// * * * * *  * * * * *
	setList$(val: iPrompt[]) {
		this.list$.next(val);
	}
	getList$() {
		return this.list$.asObservable();
	}
	getListDeep() {
		return JSON.parse(JSON.stringify(this.list$.value)) as iPrompt[];
	}
	// * * * * *  * * * * *
	strToPromptList(s: string) {
		// 修剪多餘的格式
		while (true) {
			const before = s;
			s = s.replaceAll("  ", " ");
			s = s.replaceAll("\n", "");
			s = s.replaceAll(" ,", ",");
			s = s.replaceAll(", ", ",");
			s = s.replaceAll("{", "(");
			s = s.replaceAll("}", ")");
			s = s.replaceAll(" )", ")");
			s = s.replaceAll("( ", ")");
			s = s.replaceAll("[ ", "[");
			s = s.replaceAll(" ]", "]");
			s = s.replaceAll(" ,,", ",");
			s = s.trim();
			if (before === s) break;
		}
		// * * * * *  * * * * *
		let tempList: iPrompt[] = [];
		let endPos = -1;
		let stack: (")" | "]")[] = [];
		for (let i = s.length - 1; i > -1; i--) {
			if (endPos === -1) endPos = i;
			if (s[i] === ")") {
				stack.push(s[i] as any);
			}
			if (s[i] === "]") {
				stack.push(s[i] as any);
			}
			if (s[i] === "(") {
				if (stack[stack.length - 1] === ")") {
					stack.pop();
				} else {
					alert("格式化發生問題");
					break;
				}
			}
			if (s[i] === "[") {
				if (stack[stack.length - 1] === "]") {
					stack.pop();
				} else {
					alert("格式化發生問題");
					break;
				}
			}
			// 字串處理完後 關鍵詞判別
			if ((s[i] === "," || i === 0) && stack.length === 0) {
				tempList.push(genPrompt(i, endPos));
				endPos = -1;
				stack = [];
				continue;
			}
		}
		// * * * * *  * * * * *
		tempList = tempList.filter(e => e.val).reverse();
		this.setList$(tempList);
		this.promptListToStr("split");
		// * * * * *  * * * * *
		function genPrompt(start: number, end: number): iPrompt {
			let bracketWeight = 0;
			if (s[start] === ",") start++;
			// 計算括號權重
			while (true) {
				let startStr = s[start];
				let endStr = s[end];
				if (startStr === "(" && endStr === ")" && bracketWeight >= 0) {
					start++;
					end--;
					bracketWeight++;
				} else if (startStr === "[" && endStr === "]" && bracketWeight <= 0) {
					start++;
					end--;
					bracketWeight--;
				} else {
					break;
				}
			}
			// 計算數字權重 ex:((abc:1.54)) 抓取 1.54
			let numWeight = 0;
			let currPos = end;
			while (true && bracketWeight === 1) {
				if (s[currPos] === ":") {
					const t = s.substring(currPos + 1, end + 1);
					if (!isNaN(Number(t))) {
						numWeight = Number(t);
						end = currPos - 1;
						break;
					}
				}
				if (currPos <= start) break;
				currPos--;
			}
			if (numWeight !== 0) bracketWeight = 0;
			const result: iPrompt = { bracketWeight, numWeight, val: s.substring(start, end + 1) };
			return result;
		}
	}
	promptListToStr(mode: "split" | "zip" = "zip") {
		const list = this.getListDeep();
		let result = "";
		list.forEach((e, i) => {
			let tempStr = e.val;
			// * * * * * 括號權重 * * * * *
			while (e.bracketWeight !== 0) {
				if (e.bracketWeight > 0) {
					tempStr = `(${tempStr})`;
					e.bracketWeight--;
				} else {
					tempStr = `[${tempStr}]`;
					e.bracketWeight++;
				}
			}
			// * * * * * 數字權重 * * * * *
			if (e.numWeight !== 0) {
				tempStr = `(${tempStr}:${e.numWeight})`;
			}
			// * * * * * 末位逗點 * * * * *
			result = result + tempStr;
			if (i < list.length - 1) {
				result += ",";
				// * * * * * 分隔模式 或 壓縮模式 * * * * *
				if (mode === "split") {
					result += "\n";
				}
			}
		});
		return result;
	}
	setLocal(data: iPromptStore[]) {
		localStorage.setItem("PROMPT-STORE", JSON.stringify(data));
	}
	getLocal() {
		const str = localStorage.getItem("PROMPT-STORE");
		if (str) {
			return JSON.parse(str) as iPromptStore[];
		} else {
			return [] as iPromptStore[];
		}
	}
}
