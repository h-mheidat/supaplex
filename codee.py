# x is building height
x=[3,5,4,4,3,1,3,2]
x.reverse()
y=0
t=[]
i=0
for i in range (len(x)) :
    if x[i] > y :
        t.append(x[i])
        y = x[i]
    i +=1 
t.reverse()
print(t)
