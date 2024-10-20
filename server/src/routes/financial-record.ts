import { Request, Response, Router } from "express";
import FinancialRecordModel from "../schema/financial-record";
import { FinancialRecord } from "../types/financialRecord"; // Ensure correct path

const router: Router = Router();

router.get("/getAllByUserID/:userId", async (req: Request<{ userId: string }>, res: Response) => {
  try {
    const { userId } = req.params;
    const records = await FinancialRecordModel.find({ userId });
    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req: Request<{}, {}, FinancialRecord>, res: Response) => {
  try {
    const newRecordBody: FinancialRecord = req.body; // Ensure type safety
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req: Request<{ id: string }, {}, FinancialRecord>, res: Response) => {
  try {
    const { id } = req.params;
    const newRecordBody: FinancialRecord = req.body; // Ensure type safety
    const record = await FinancialRecordModel.findByIdAndUpdate(id, newRecordBody, { new: true });
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
