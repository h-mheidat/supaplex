def building_length() -> None:
    building_leng=[3,5,4,4,3,1,3,2]
    
    result=[]
    max=0
    r_f=[]
    i=len(building_leng) -1
    while  i>0:      
        if(max<building_leng[i]):
                max=building_leng[i]
                result.append(max)
        i-=1      
    x=len(result)-1
    while x>=0:
        r_f.append(result[x])
        x-=1

    print(r_f)
building_length()