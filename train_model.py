import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

df = pd.read_csv('dataset.csv')
X = df.drop('credit_score', axis=1)
y = df['credit_score']

le_emp = LabelEncoder()
X['employment_type'] = le_emp.fit_transform(X['employment_type'])

le_debt = LabelEncoder()
X['existing_debt'] = le_debt.fit_transform(X['existing_debt'])

le_score = LabelEncoder()
y_encoded = le_score.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

preds = model.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, preds):.2f}")

joblib.dump(model, 'model.pkl')
joblib.dump(le_emp, 'le_emp.pkl')
joblib.dump(le_debt, 'le_debt.pkl')
joblib.dump(le_score, 'le_score.pkl')
print("Model and encoders saved!")
