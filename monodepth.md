# 单目深度估计的相关理解

## 一、相关定义

**深度估计：** 利用图像中像素变换获取场景中每个点到相机的距离信息，这种距离信息组成的图称之为深度图

**绝对深度：** 绝对深度反映的是像素点与像素点之间的相对距离

**相对深度：** 相对深度反映的是像素点代表的目标距离相机的真实距离



## 二、深度估计的相关方法

### 1. 主动获取

**方式：** 激光雷达或者深度相机

**优点：** 精度高，获取方便

**缺点：** 对雨天、灰尘及光线等明显；空间测量范围小；无法获取纹理信息；贵

### 2. 被动获取

- **方式一**： 基于多视点

    **原理：** 构建相机阵列，利用多视点之间的冗余信息估计

    **优缺点：** 深度信息估计准确，但需要配置相机阵列，实际一般不采用

- **方式二：** 基于双目图像（立体匹配技术）

    **原理：** 1）左、右相机校准；2）找到左、右相机所拍的图像对应点；3）利用**三角原理** 计算视差图；4）利用视差图得到深度图

    **优缺点：** 需要时间同步；误差较大，对于相对姿态有要求；布置的体积较大

- **方式三：** 基于单目图像

    **原理：** 利用单目视频中的多帧图像的差异估计深度图

    **优缺点：** 价格低廉；传感器体积小；最贴近实际的应用需求；目前深度估计领域的研究热点

    ![image-20220610104202088](%E5%8D%95%E7%9B%AE%E6%B7%B1%E5%BA%A6%E4%BC%B0%E8%AE%A1%E7%9A%84%E7%9B%B8%E5%85%B3%E7%90%86%E8%A7%A3.assets/image-20220610104202088.png)

    