from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import chi2

def reduce_features_chi2(X, Y):
	X_new = SelectKBest(chi2, k=2).fit_transform(X, Y)
	return X_new

def reduce_features_l1(X, Y):
	lsvc = LinearSVC(C=0.01, penalty="l1", dual=False).fit(X, y)
	model = SelectFromModel(lsvc, prefit=True)
	X_new = model.transform(X)
	return X_new