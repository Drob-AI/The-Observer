import random
import numpy as np
from sklearn import tree
from sklearn import neighbors
from sklearn import svm
from sklearn import grid_search
from sklearn.metrics import accuracy_score
from sklearn.grid_search import GridSearchCV
from sklearn import cross_validation
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import mean_squared_error


def split_sets(dataset, test_set_len):
    test_set = []
    original_dataset_len = len(dataset)
    dataset = list(dataset)
    while(len(test_set) < original_dataset_len * test_set_len):
        index = random.randint(0, len(dataset) - 1)
        test_set.append(dataset[index])
        del dataset[index]

    return ( test_set, dataset)

def split_train_result_set(set, feature_index):
    transponed = np.array(set).T
    results_set = transponed[feature_index]

    transponed = list(transponed)
    del transponed[feature_index]

    x_set = np.array(transponed).T
    results_set = results_set.T

    return(x_set, results_set)


def train_classifier_tree(dataset, feature_index, stats):
    # print(dataset, feature_index)
    test_set, train_set = split_sets(dataset, 0.1)
    x_train, y_train = split_train_result_set(train_set, feature_index)
    x_train_test, y_train_test = split_train_result_set(test_set, feature_index)

    # if( stats[feature_index]['type']  == 'string'):
    clf = tree.DecisionTreeClassifier()
    clf = clf.fit(x_train, y_train)
    print(accuracy_score(clf.predict(x_train_test), y_train_test))
    print(len(test_set), len(train_set))
    # else:
    #     clf = tree.DecisionTreeClassifier()
    #     print(x_train, y_train)
    #     clf = clf.fit(x_train, y_train)
    #     print("MSE",  mean_squared_error(clf.predict(x_train_test), y_train_test))
    #     print(len(test_set), len(train_set))

def train_classifier_tree2(dataset, feature_index, stats):
    # print(dataset, feature_index)
    test_set, train_set = split_sets(dataset, 0.1)
    x_train, y_train = split_train_result_set(train_set, feature_index)
    x_train_test, y_train_test = split_train_result_set(test_set, feature_index)

    n_estimators=[100, 180]
    min_samples_split=[2, 10]

    clf = RandomForestClassifier()
    # clf = tree.DecisionTreeClassifier()
    # clf = clf.fit(x_train, y_train)

    nFolds = 5
    param_grid = dict(n_estimators=n_estimators, min_samples_split=min_samples_split)

    # param_grid = dict(max_depth=[10, 11, 12, 15],)

    cv = cross_validation.StratifiedKFold(y_train, nFolds)
    grid = GridSearchCV(clf, param_grid=param_grid,cv=cv)
    grid.fit(x_train, y_train)

    print(accuracy_score(grid.predict(x_train_test), y_train_test))


    print(len(test_set), len(train_set))


def train_knn(dataset, feature_index, stats):
    test_set, train_set = split_sets(dataset, 0.1)
    x_train, y_train = split_train_result_set(train_set, feature_index)
    x_train_test, y_train_test = split_train_result_set(test_set, feature_index)

    knn = neighbors.KNeighborsClassifier()
    knn = knn.fit(x_train, y_train)


    print(accuracy_score(knn.predict(x_train_test), y_train_test))

    print(len(test_set), len(train_set))


def train_knn2(dataset, feature_index, stats):
    test_set, train_set = split_sets(dataset, 0.1)
    x_train, y_train = split_train_result_set(train_set, feature_index)
    x_train_test, y_train_test = split_train_result_set(test_set, feature_index)

    nFolds = 4
    metrics = ['minkowski','euclidean','manhattan']
    weights = ['uniform','distance']
    numNeighbors = np.arange(5, 10)
    param_grid = dict(metric=metrics,weights=weights,n_neighbors=numNeighbors)
    cv = cross_validation.StratifiedKFold(y_train, nFolds)
    grid = GridSearchCV(neighbors.KNeighborsClassifier(), param_grid=param_grid,cv=cv)
    grid.fit(x_train, y_train)

    print(accuracy_score(grid.predict(x_train_test), y_train_test))

def train_classifier_svm(dataset, feature_index, stats):
    test_set, train_set = split_sets(dataset, 0.1)
    x_train, y_train = split_train_result_set(train_set, feature_index)
    x_train_test, y_train_test = split_train_result_set(test_set, feature_index)

    clf = svm.SVC()
    clf = clf.fit(x_train, y_train)
    print(accuracy_score(clf.predict(x_train_test), y_train_test))
    print(len(test_set), len(train_set))

def train_classifier_svm2(dataset, feature_index, stats):
    test_set, train_set = split_sets(dataset, 0.1)
    x_train, y_train = split_train_result_set(train_set, feature_index)
    x_train_test, y_train_test = split_train_result_set(test_set, feature_index)

    param_grid = [{'C': [1, 10, 100, 1000], 'gamma': [0.001, 0.0001], 'kernel': ['rbf']}]
    grid = GridSearchCV(svm.SVC(), param_grid=param_grid)

    grid.fit(x_train, y_train)

    print(accuracy_score(grid.predict(x_train_test), y_train_test))