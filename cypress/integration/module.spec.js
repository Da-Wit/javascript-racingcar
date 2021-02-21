import Model from "../../src/js/Model.js"
import { getWinners, getRandomNumber } from "../../src/js/Utils.js"
import Controller from "../../src/js/Controller.js"

/// <reference types="cypress" />

context("module test", () => {
	it("이름 입력 칸에 ','로 구분해서 이름을 입력할 수 있다.", () => {
		const model = new Model()
		model.initializeCars("a,b,c")
		expect(model.cars).to.deep.equal([
			{ name: "a", score: 0 },
			{ name: "b", score: 0 },
			{ name: "c", score: 0 },
		])
	})

	it("랜덤 숫자는 0에서 9 사이의 정수여야 한다.", () => {
		for (let i = 0; i < 909; i++) {
			expect(/[0-9]/.test(getRandomNumber(0, 9))).to.equal(true)
		}
	})

	it("각 자동차는 입력한 횟수만큼 반복하여 랜덤 숫자를 배정받고, 랜덤 숫자가 4-9일 때 전진 횟수가 1 증가한다.", () => {
		const model = new Model()
		model.initializeCars("가,나,다")
		model.move(0)
		expect(model.cars[0].score).to.equal(1)
		model.move(0)
		expect(model.cars[0].score).to.equal(2)
		model.move(0)
		expect(model.cars[0].score).to.equal(3)
	})

	it("우승자를 리턴한다.", () => {
		const model = new Model()
		model.initializeCars("가,나,다")
		model.move(0)
		model.move(0)
		model.move(1)

		expect(getWinners(model.cars)).to.deep.equal(["가"])
	})

	it("우승자가 2명 이상일 경우 ‘,’로 구분하여 출력한다.", () => {
		const model = new Model()
		const controller = new Controller()
		model.initializeCars("가,나,다")
		model.move(0)
		model.move(0)
		model.move(1)
		model.move(1)
		model.move(2)

		expect(controller.getResultText(model.cars)).to.deep.equal(
			`🏆 최종 우승자: 가, 나 🏆`
		)
	})
})
